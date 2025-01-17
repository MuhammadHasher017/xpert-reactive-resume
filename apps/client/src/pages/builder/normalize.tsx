import { ResumeDto } from "@reactive-resume/dto";

export function normalizeResumeData(apiData: Partial<ResumeDto>): ResumeDto {
  const defaultResume: ResumeDto = {
    id: "1",
    title: "resume",
    slug: "resume",
    data: {
      basics: {
        name: "",
        headline: "",
        email: "",
        phone: "",
        location: "",
        url: { label: "", href: "" },
        customFields: [],
        picture: {
          url: "",
          size: 0,
          aspectRatio: 0,
          borderRadius: 0,
          effects: { hidden: false, border: false, grayscale: false },
        },
      },
      sections: {
        summary: {
          id: "summary",
          name: "Summary",
          columns: 1,
          visible: true,
          separateLinks: false,
          content: "",
        },
        awards: { id: "awards", name: "Awards", columns: 1, visible: true, items: [] },
        certifications: {
          id: "certifications",
          name: "Certifications",
          columns: 2,
          visible: true,
          separateLinks: false,

          items: [
            {
              id: "",
              visible: true,
              name: "",
              issuer: "",
              date: "",
              summary: "",
              url: { label: "", href: "" },
            },
          ],
        },
        education: {
          id: "education",
          name: "Education",
          separateLinks: false,

          columns: 1,
          visible: true,
          items: [
            {
              id: "",
              visible: true,
              institution: "",
              studyType: "",
              area: "",
              score: "",
              date: "",
              summary: "",
              url: { label: "", href: "" },
            },
          ],
        },
        experience: {
          id: "experience",
          name: "Experience",
          columns: 1,
          separateLinks: false,

          visible: true,
          items: [
            {
              id: "",
              visible: true,
              company: "",
              position: "",
              location: "",
              date: "",
              summary: "",
              url: { label: "", href: "" },
            },
          ],
        },
        volunteer: {
          id: "volunteer",
          name: "Volunteering",
          columns: 1,
          visible: true,
          items: [
            {
              id: "",
              visible: true,
              company: "",
              separateLinks: false,

              position: "",
              location: "",
              date: "",
              summary: "",
              url: { label: "", href: "" },
            },
          ],
        },
        interests: { id: "interests", name: "Interests", columns: 1, visible: true, items: [] },
        languages: {
          id: "languages",
          name: "Languages",
          columns: 2,
          separateLinks: false,
          visible: true,
          items: [],
        },
        profiles: {
          id: "profiles",
          name: "Profiles",
          columns: 3,
          separateLinks: false,
          visible: true,
          items: [
            {
              id: "",
              visible: true,
              network: "",
              username: "",
              icon: "",
              url: { label: "", href: "" },
            },
          ],
        },
        projects: {
          id: "projects",
          name: "Projects",
          columns: 2,
          visible: true,
          separateLinks: false,

          items: [
            {
              id: "",
              visible: true,
              name: "",
              description: "",
              date: "",
              summary: "",
              keywords: [],
              url: { label: "", href: "" },
            },
          ],
        },
        publications: {
          id: "publications",
          name: "Publications",
          columns: 1,
          separateLinks: false,

          visible: true,
          items: [],
        },
        references: {
          id: "references",
          name: "References",
          columns: 1,
          visible: true,
          separateLinks: false,

          items: [
            {
              id: "",
              visible: true,
              name: "",
              description: "",
              summary: "",
              url: { label: "", href: "" },
            },
          ],
        },
        skills: {
          id: "skills",
          name: "Skills",
          separateLinks: false,
          columns: 3,
          visible: true,
          items: [{ id: "", visible: true, name: "", description: "", level: 0, keywords: [] }],
        },
        custom: {},
      },
      metadata: {
        template: "bronzor",
        layout: [
          [
            ["profiles", "summary", "experience", "education", "references"],
            [
              "skills",
              "certifications",
              "projects",
              "interests",
              "languages",
              "awards",
              "volunteer",
              "publications",
            ],
          ],
        ],
        css: {
          value: ".section {\n\toutline: 1px solid #000;\n\toutline-offset: 4px;\n}",
          visible: false,
        },
        page: {
          margin: 14,
          format: "a4",
          options: {
            breakLine: true,
            pageNumbers: true,
          },
        },
        theme: {
          background: "#ffffff",
          text: "#000000",
          primary: "#ca8a04",
        },
        typography: {
          font: {
            family: "Merriweather",
            subset: "latin",
            variants: ["regular"],
            size: 13,
          },
          lineHeight: 1.75,
          hideIcons: false,
          underlineLinks: true,
        },
        notes: "",
      },
    },
    visibility: "private",
    locked: false,
    userId: "cm2ooirzd0oxezg05hn79xzaw",
    createdAt: "2024-11-07T10:24:51.461Z",
    updatedAt: "2024-11-07T10:30:41.683Z",
  };

  // Deep merge for sections
  const mergeSections = (defaultSections: any, apiSections: any) => {
    const mergedSections = { ...defaultSections };

    for (const key of Object.keys(defaultSections)) {
      if (apiSections?.[key]) {
        mergedSections[key] = {
          ...defaultSections[key],
          ...apiSections[key],
          items: mergeItems(defaultSections[key].items || [], apiSections[key].items || []),
        };
      }
    }

    return mergedSections;
  };

  // Deep merge for items
  const mergeItems = (defaultItems: any[], apiItems: any[]) => {
    return apiItems.map((apiItem: any, index: number) => ({
      ...defaultItems[index % defaultItems.length], // Cycle through defaults if items exceed
      ...apiItem,
    }));
  };

  // Merge API data into the default structure
  return {
    ...defaultResume,
    ...apiData,
    data: {
      ...defaultResume.data,
      ...apiData.data,
      basics: {
        ...defaultResume.data.basics,
        ...apiData.data?.basics,
      },
      sections: mergeSections(defaultResume.data.sections, apiData.data?.sections),
    },
  };
}
