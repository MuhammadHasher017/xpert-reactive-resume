import { ResumeDto } from "@reactive-resume/dto";

import { axios } from "@/client/libs/axios";

export const findResumeById = async (data: { id: string }) => {
  const response = {
    id: "cm375vklh1wvrzg05ys4fy1kv",
    title: "test123",
    slug: "test123",
    data: {
      basics: {
        name: "Muhammad Hasher",
        headline: "",
        email: "muhammadhasher017@gmail.com",
        phone: "",
        location: "",
        url: {
          label: "",
          href: "",
        },
        customFields: [],
        picture: {
          url: "https://lh3.googleusercontent.com/a/ACg8ocLY_aY90BiWheIoyTbjMk_z5FlvnEJ3pAQq_6-GD7vOsb_uoIk3=s96-c",
          size: 64,
          aspectRatio: 1,
          borderRadius: 0,
          effects: {
            hidden: false,
            border: false,
            grayscale: false,
          },
        },
      },
      sections: {
        summary: {
          name: "Summary",
          columns: 1,
          separateLinks: true,
          visible: true,
          id: "summary",
          content: "<p>jkklkjkljlkjlkjlkljlkjkljjjjjjjjjjjjjjjjjjjjjjjjjjj</p>",
        },
        awards: {
          name: "Awards",
          columns: 1,
          separateLinks: true,
          visible: true,
          id: "awards",
          items: [],
        },
        certifications: {
          name: "Certifications",
          columns: 1,
          separateLinks: true,
          visible: true,
          id: "certifications",
          items: [],
        },
        education: {
          name: "Education",
          columns: 1,
          separateLinks: true,
          visible: true,
          id: "education",
          items: [],
        },
        experience: {
          name: "Experience",
          columns: 1,
          separateLinks: true,
          visible: true,
          id: "experience",
          items: [],
        },
        volunteer: {
          name: "Volunteering",
          columns: 1,
          separateLinks: true,
          visible: true,
          id: "volunteer",
          items: [],
        },
        interests: {
          name: "Interests",
          columns: 1,
          separateLinks: true,
          visible: true,
          id: "interests",
          items: [],
        },
        languages: {
          name: "Languages",
          columns: 1,
          separateLinks: true,
          visible: true,
          id: "languages",
          items: [],
        },
        profiles: {
          name: "Profiles",
          columns: 1,
          separateLinks: true,
          visible: true,
          id: "profiles",
          items: [],
        },
        projects: {
          name: "Projects",
          columns: 1,
          separateLinks: true,
          visible: true,
          id: "projects",
          items: [],
        },
        publications: {
          name: "Publications",
          columns: 1,
          separateLinks: true,
          visible: true,
          id: "publications",
          items: [],
        },
        references: {
          name: "References",
          columns: 1,
          separateLinks: true,
          visible: true,
          id: "references",
          items: [],
        },
        skills: {
          name: "Skills",
          columns: 1,
          separateLinks: true,
          visible: true,
          id: "skills",
          items: [],
        },
        custom: {},
      },
      metadata: {
        template: "azurill",
        layout: [
          [
            [
              "skills",
              "profiles",
              "volunteer",
              "experience",
              "summary",
              "education",
              "projects",
              "references",
            ],
            ["interests", "certifications", "awards", "publications", "languages"],
          ],
          [[], []],
        ],
        css: {
          value: ".section {\n\toutline: 1px solid #000;\n\toutline-offset: 4px;\n}",
          visible: false,
        },
        page: {
          margin: 18,
          format: "a4",
          options: {
            breakLine: true,
            pageNumbers: true,
          },
        },
        theme: {
          background: "#ffffff",
          text: "#000000",
          primary: "#dc2626",
        },
        typography: {
          font: {
            family: "Montserrat",
            subset: "latin",
            variants: ["regular"],
            size: 12,
          },
          lineHeight: 1.3,
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

  return response.data;
};

export const findResumeByUsernameSlug = async (data: { username: string; slug: string }) => {
  const response = await axios.get<ResumeDto>(`/resume/public/${data.username}/${data.slug}`);

  return response.data;
};
