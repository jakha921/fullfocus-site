import { prisma } from "@/lib/prisma";
import type { Locale } from "@/lib/i18n";

export type PublicService = {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  features: string[];
  order: number;
};

export type PublicProject = {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDesc: string | null;
  category: string;
  client: string | null;
  technologies: string[];
  images: string[];
  coverImage: string;
  link: string | null;
  featured: boolean;
  order: number;
};

export type PublicTeamMember = {
  id: string;
  name: string;
  position: string;
  photo: string | null;
  bio: string | null;
  linkedin: string | null;
  github: string | null;
  telegram: string | null;
  order: number;
};

export type PublicTestimonial = {
  id: string;
  clientName: string;
  company: string;
  position: string | null;
  content: string;
  avatar: string | null;
  rating: number;
  order: number;
};

type JsonObject = Record<string, unknown>;

type ServiceRecord = {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  features: string[];
  order: number;
  translations?: unknown;
};

type ProjectRecord = {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDesc: string | null;
  category: string;
  client: string | null;
  technologies: string[];
  images: string[];
  coverImage: string;
  link: string | null;
  featured: boolean;
  order: number;
  translations?: unknown;
};

type TeamMemberRecord = {
  id: string;
  name: string;
  position: string;
  photo: string | null;
  bio: string | null;
  linkedin: string | null;
  github: string | null;
  telegram: string | null;
  order: number;
  translations?: unknown;
};

type TestimonialRecord = {
  id: string;
  clientName: string;
  company: string;
  position: string | null;
  content: string;
  avatar: string | null;
  rating: number;
  order: number;
  translations?: unknown;
};

function asObject(value: unknown): JsonObject {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonObject)
    : {};
}

function localizedObject(translations: unknown, locale: Locale): JsonObject {
  const all = asObject(translations);
  return asObject(all[locale]);
}

function localizedString(
  translations: unknown,
  locale: Locale,
  key: string,
  fallback: string | null | undefined
) {
  const value = localizedObject(translations, locale)[key];
  return typeof value === "string" && value.trim() ? value : fallback || "";
}

function localizedStringArray(
  translations: unknown,
  locale: Locale,
  key: string,
  fallback: string[]
) {
  const value = localizedObject(translations, locale)[key];
  return Array.isArray(value) && value.every((item) => typeof item === "string")
    ? value
    : fallback;
}

function optimizedPublicImage(image: string | null | undefined) {
  if (!image) return image || "";
  return image.startsWith("/images/") && /\.jpe?g$/i.test(image)
    ? image.replace(/\.jpe?g$/i, ".avif")
    : image;
}

function isMissingCmsColumn(error: unknown) {
  const code =
    typeof error === "object" && error && "code" in error
      ? (error as { code?: string }).code
      : undefined;
  return code === "P2021" || code === "P2022";
}

function serviceToPublic(service: ServiceRecord, locale: Locale): PublicService {
  return {
    id: service.id,
    title: localizedString(service.translations, locale, "title", service.title),
    slug: service.slug,
    description: localizedString(
      service.translations,
      locale,
      "description",
      service.description
    ),
    icon: service.icon,
    features: localizedStringArray(
      service.translations,
      locale,
      "features",
      service.features
    ),
    order: service.order,
  };
}

export async function getPublicServices(locale: Locale): Promise<PublicService[]> {
  let services: ServiceRecord[];
  try {
    services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        icon: true,
        features: true,
        order: true,
        translations: true,
      },
    });
  } catch (error) {
    if (!isMissingCmsColumn(error)) throw error;
    const legacyServices = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        icon: true,
        features: true,
        order: true,
      },
    });
    services = legacyServices.map((service) => ({
      ...service,
      translations: null,
    }));
  }

  return services.map((service) => serviceToPublic(service, locale));
}

export async function getFeaturedProjects(locale: Locale, take = 3) {
  const projects = await findPublicProjects({
    where: { isActive: true, featured: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    take,
  });

  return projects.map((project) => localizeProject(project, locale));
}

export async function getPublicProjects(locale: Locale) {
  const projects = await findPublicProjects({
    where: { isActive: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  return projects.map((project) => localizeProject(project, locale));
}

export async function getPublicProjectBySlug(slug: string, locale: Locale) {
  const project = await findPublicProject({ slug, isActive: true });

  return project ? localizeProject(project, locale) : null;
}

export async function getRelatedProjects(
  project: PublicProject,
  locale: Locale,
  take = 2
) {
  const projects = await findPublicProjects({
    where: {
      id: { not: project.id },
      isActive: true,
    },
    orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
    take,
  });

  return projects.map((item) => localizeProject(item, locale));
}

async function findPublicProjects(args: {
  where: Record<string, unknown>;
  orderBy: Record<string, string>[];
  take?: number;
}): Promise<ProjectRecord[]> {
  try {
    return await prisma.project.findMany({
      ...args,
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        shortDesc: true,
        category: true,
        client: true,
        technologies: true,
        images: true,
        coverImage: true,
        link: true,
        featured: true,
        order: true,
        translations: true,
      },
    });
  } catch (error) {
    if (!isMissingCmsColumn(error)) throw error;
    const projects = await prisma.project.findMany({
      ...args,
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        shortDesc: true,
        category: true,
        client: true,
        technologies: true,
        images: true,
        coverImage: true,
        link: true,
        featured: true,
        order: true,
      },
    });
    return projects.map((project) => ({ ...project, translations: null }));
  }
}

async function findPublicProject(
  where: Record<string, unknown>
): Promise<ProjectRecord | null> {
  try {
    return await prisma.project.findFirst({
      where,
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        shortDesc: true,
        category: true,
        client: true,
        technologies: true,
        images: true,
        coverImage: true,
        link: true,
        featured: true,
        order: true,
        translations: true,
      },
    });
  } catch (error) {
    if (!isMissingCmsColumn(error)) throw error;
    const project = await prisma.project.findFirst({
      where,
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        shortDesc: true,
        category: true,
        client: true,
        technologies: true,
        images: true,
        coverImage: true,
        link: true,
        featured: true,
        order: true,
      },
    });
    return project ? { ...project, translations: null } : null;
  }
}

function localizeProject(project: ProjectRecord, locale: Locale): PublicProject {
  return {
    id: project.id,
    title: localizedString(project.translations, locale, "title", project.title),
    slug: project.slug,
    description: localizedString(
      project.translations,
      locale,
      "description",
      project.description
    ),
    shortDesc: localizedString(
      project.translations,
      locale,
      "shortDesc",
      project.shortDesc
    ),
    category: localizedString(
      project.translations,
      locale,
      "category",
      project.category
    ),
    client: project.client,
    technologies: project.technologies,
    images: project.images.map(optimizedPublicImage),
    coverImage: optimizedPublicImage(project.coverImage),
    link: project.link,
    featured: project.featured,
    order: project.order,
  };
}

export async function getPublicTeamMembers(locale: Locale) {
  let members: TeamMemberRecord[];
  try {
    members = await prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      select: {
        id: true,
        name: true,
        position: true,
        photo: true,
        bio: true,
        linkedin: true,
        github: true,
        telegram: true,
        order: true,
        translations: true,
      },
    });
  } catch (error) {
    if (!isMissingCmsColumn(error)) throw error;
    const legacyMembers = await prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      select: {
        id: true,
        name: true,
        position: true,
        photo: true,
        bio: true,
        linkedin: true,
        github: true,
        telegram: true,
        order: true,
      },
    });
    members = legacyMembers.map((member) => ({ ...member, translations: null }));
  }

  return members.map((member) => ({
    id: member.id,
    name: member.name,
    position: localizedString(
      member.translations,
      locale,
      "position",
      member.position
    ),
    photo: optimizedPublicImage(member.photo),
    bio: localizedString(member.translations, locale, "bio", member.bio),
    linkedin: member.linkedin,
    github: member.github,
    telegram: member.telegram,
    order: member.order,
  }));
}

export async function getPublicTestimonials(locale: Locale, take = 3) {
  let testimonials: TestimonialRecord[];
  try {
    testimonials = await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      take,
      select: {
        id: true,
        clientName: true,
        company: true,
        position: true,
        content: true,
        avatar: true,
        rating: true,
        order: true,
        translations: true,
      },
    });
  } catch (error) {
    if (!isMissingCmsColumn(error)) throw error;
    const legacyTestimonials = await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      take,
      select: {
        id: true,
        clientName: true,
        company: true,
        position: true,
        content: true,
        avatar: true,
        rating: true,
        order: true,
      },
    });
    testimonials = legacyTestimonials.map((testimonial) => ({
      ...testimonial,
      translations: null,
    }));
  }

  return testimonials.map((testimonial) => ({
    id: testimonial.id,
    clientName: testimonial.clientName,
    company: testimonial.company,
    position: localizedString(
      testimonial.translations,
      locale,
      "position",
      testimonial.position
    ),
    content: localizedString(
      testimonial.translations,
      locale,
      "content",
      testimonial.content
    ),
    avatar: optimizedPublicImage(testimonial.avatar),
    rating: testimonial.rating,
    order: testimonial.order,
  }));
}

export async function getContentBlock<T extends JsonObject>(
  key: string,
  locale: Locale,
  fallback: T
) {
  let block;
  try {
    block = await prisma.contentBlock.findUnique({
      where: { key_locale: { key, locale } },
    });
  } catch (error) {
    if (isMissingCmsColumn(error)) return fallback;
    throw error;
  }

  if (!block?.isActive) return fallback;
  return {
    ...fallback,
    ...asObject(block.payload),
  } as T;
}
