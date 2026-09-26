export interface MockPage {
  id: string;
  title: string;
  site: string;
  path: string;
  intro: string;
  highlight: string;
  outro: string;
}

export const mockPages: MockPage[] = [
  {
    id: "design-systems",
    title: "How Design Systems Help Teams Move Faster",
    site: "example.com",
    path: "/blog/design-systems",
    intro:
      "Design systems are often introduced to make interfaces look consistent. Their bigger benefit is speed.",
    highlight:
      "A shared design system reduces repeated decisions, so teams can focus on the problem instead of the button.",
    outro:
      "Over time, shared components also make accessibility improvements easier to roll out everywhere at once.",
  },
  {
    id: "onboarding",
    title: "A Simple Framework for Better User Onboarding",
    site: "example.com",
    path: "/blog/user-onboarding",
    intro:
      "Most products lose new users in the first session, often before they see any real value.",
    highlight:
      "The first five minutes decide whether someone becomes a user or a bounce statistic.",
    outro:
      "A short, focused first task beats a long feature tour almost every time.",
  },
];

export function getMockPage(id: string): MockPage {
  return mockPages.find((p) => p.id === id) ?? mockPages[0];
}
