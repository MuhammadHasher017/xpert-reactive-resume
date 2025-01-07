import { unknown } from "@reactive-resume/dto";
import { useCallback, useEffect } from "react";
import { LoaderFunction, redirect } from "react-router-dom";

import { useBuilderStore } from "@/client/stores/builder";
import { useResumeStore } from "@/client/stores/resume";

export const BuilderPage = () => {
  const frameRef = useBuilderStore((state) => state.frame.ref);
  const setFrameRef = useBuilderStore((state) => state.frame.setRef);

  const resume = useResumeStore((state) => state.resume);
  const title = useResumeStore((state) => state.resume.title);

  const updateResumeInFrame = useCallback(() => {
    if (!frameRef?.contentWindow) return;
    const message = { type: "SET_RESUME", payload: resume.data };
    (() => {
      frameRef.contentWindow.postMessage(message, "*");
    })();
  }, [frameRef, resume.data]);

  // Send resume data to iframe on initial load
  useEffect(() => {
    if (!frameRef) return;
    frameRef.addEventListener("load", updateResumeInFrame);
    return () => {
      frameRef.removeEventListener("load", updateResumeInFrame);
    };
  }, [frameRef]);

  // Send resume data to iframe on change of resume data
  useEffect(updateResumeInFrame, [resume.data]);

  return (
    <iframe
      ref={setFrameRef}
      title={resume.id}
      src="/artboard/builder"
      className="mt-16 w-screen"
      style={{ height: `calc(100vh - 64px)` }}
    />
  );
};

export const builderLoader: LoaderFunction<unknown> = async ({ params }) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const id = params.id!;

    const resume = {
      id: "cm375vklh1wvrzg05ys4fy1kv",
      title: "test123",
      slug: "test123",
      data: {
        basics: {
          name: "Muhammad Hamza Iqtedar",
          headline: "Passionate and results-driven Data Scientist and Junior AI Engineer",
          email: "mailto:hamza900561@gmail.com",
          phone: "03001882001",
          location: "",
          url: {
            label: "",
            href: "https://www.linkedin.com/in/muhammad-hamza-iqtedar-2842b8279",
          },
          customFields: [],
          picture: {
            url: "",
            size: 0,
            aspectRatio: 0,
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
            visible: true,
            id: "summary",
            content:
              "<p>Passionate and results-driven Data Scientist and Junior AI Engineer with a strong foundation in statistical analysis, machine learning, and data visualization. Experienced in leveraging advanced techniques such as LLM fine-tuning, RAG, and vector databases to solve complex problems. Adept at using Python, SQL, Tableau, and Power BI to analyze large datasets and present findings to stakeholders. Committed to continuous learning and applying innovative solutions to drive business decisions.</p>",
          },
          awards: {
            name: "Awards",
            columns: 1,
            visible: true,
            id: "awards",
            items: [],
          },
          certifications: {
            name: "Certifications",
            columns: 1,
            visible: true,
            id: "certifications",
            items: [
              {
                id: "1",
                visible: true,
                name: "Ai for everyone from Coursera",
                description: "",
                summary: "",
                url: {
                  label: "",
                  href: "https://coursera.org/verify/Z8APT86J9FC S",
                },
              },
              {
                id: "2",
                visible: true,
                name: "What is Data Science by IBM from Coursera",
                description: "",
                summary: "",
                url: {
                  label: "",
                  href: "https://coursera.org/verify/Z8APT86J9FC S",
                },
              },
            ],
          },
          education: {
            name: "Education",
            columns: 1,
            visible: true,
            id: "education",
            items: [
              {
                id: "3",
                visible: true,
                name: "HITEC UNIVERSITY",
                description: "Bachelor of Computer Science",
                summary: "Taxila, Pakistan | 07/2020 – 07/2024",
                url: {
                  label: "",
                  href: "",
                },
              },
            ],
          },
          experience: {
            name: "Experience",
            columns: 1,
            visible: true,
            id: "experience",
            items: [
              {
                id: "4",
                visible: true,
                name: "Junior AI Engineer",
                description: "MICROMERGER PVT LTD",
                summary: "08/2024 – Present",
                keywords: [],
                url: {
                  label: "",
                  href: "",
                },
                items: [
                  {
                    id: "5",
                    visible: true,
                    name: "Fine-tuned and optimized Large Language Models (LLMs) for specialized industry applications.",
                    description: "",
                    summary: "",
                    url: {
                      label: "",
                      href: "",
                    },
                  },
                  {
                    id: "6",
                    visible: true,
                    name: "Developed CREWAI agents tailored to client-specific requirements, enhancing customer support automation.",
                    description: "",
                    summary: "",
                    url: {
                      label: "",
                      href: "",
                    },
                  },
                  {
                    id: "7",
                    visible: true,
                    name: "Worked with vector databases to implement efficient document retrieval and search mechanisms.",
                    description: "",
                    summary: "",
                    url: {
                      label: "",
                      href: "",
                    },
                  },
                  {
                    id: "8",
                    visible: true,
                    name: "Implemented Retrieval-Augmented Generation (RAG) for generating contextual and accurate AI-driven responses.",
                    description: "",
                    summary: "",
                    url: {
                      label: "",
                      href: "",
                    },
                  },
                  {
                    id: "9",
                    visible: true,
                    name: "Hands-on experience with LLAMA models, improving model accuracy and scalability for various AI applications.",
                    description: "",
                    summary: "",
                    url: {
                      label: "",
                      href: "",
                    },
                  },
                ],
              },
              {
                id: "10",
                visible: true,
                name: "MACHINE LEARNING INTERN",
                description: "SWITCH COMMUNICATIONS (4 weeks)",
                summary: "01/08/2023 – 01/09/2023",
                keywords: [],
                url: {
                  label: "",
                  href: "",
                },
                items: [
                  {
                    id: "11",
                    visible: true,
                    name: "Applied machine learning techniques to optimize network traffic flow in switch communication systems.",
                    description: "",
                    summary: "",
                    url: {
                      label: "",
                      href: "",
                    },
                  },
                  {
                    id: "12",
                    visible: true,
                    name: "Utilized libraries TensorFlow, PyTorch for model development and deployment.",
                    description: "",
                    summary: "",
                    url: {
                      label: "",
                      href: "",
                    },
                  },
                  {
                    id: "13",
                    visible: true,
                    name: "Gained valuable experience in applying machine learning techniques to real-world problems.",
                    description: "",
                    summary: "",
                    url: {
                      label: "",
                      href: "",
                    },
                  },
                ],
              },
            ],
          },
          volunteer: {
            name: "Volunteering",
            columns: 1,
            visible: true,
            id: "volunteer",
            items: [],
          },
          skills: {
            name: "Skills",
            columns: 1,
            visible: true,
            id: "skills",
            items: [
              {
                id: "hn0keriukh6c0ojktl9gsgjm",
                visible: true,
                name: "",
                description: "",
                level: 0,
                keywords: [
                  "HTML5",
                  "JavaScript",
                  "PHP",
                  "Python, HTML5",
                  "JavaScript",
                  "PHP",
                  "Python",
                  "HTML5",
                  "JavaScript",
                  "Scikit-learn",
                  "HTML5",
                  "JavaScript",
                  "PHP",
                  "Python, HTML5",
                  "JavaScript",
                  "PHP",
                  "Python",
                  "HTML5",
                  "JavaScript",
                  "PHP",
                ],
              },
            ],
          },
          projects: {
            name: "Projects",
            columns: 1,
            visible: true,
            id: "projects",
            items: [
              {
                id: "14",
                visible: true,
                name: "Evaluation of Resumes Using CrewAI Agents",
                description: "",
                summary: "",
                keywords: [],
                url: {
                  label: "",
                  href: "",
                },
              },
              {
                id: "15",
                visible: true,
                name: "Evaluation of Arabic Resumes Using CrewAI Agents",
                description: "",
                summary: "",
                keywords: [],
                url: {
                  label: "",
                  href: "",
                },
              },
              {
                id: "16",
                visible: true,
                name: "Fine-Tuning a Resume Parsing Model with LLaMA 3.1: 8B",
                description: "",
                summary: "",
                keywords: [],
                url: {
                  label: "",
                  href: "",
                },
              },
              {
                id: "17",
                visible: true,
                name: "Job Description Generation Using VLLM",
                description: "",
                summary: "",
                keywords: [],
                url: {
                  label: "",
                  href: "",
                },
              },
              {
                id: "18",
                visible: true,
                name: "Predictive Analytics on Student Performance",
                description: "",
                summary: "",
                keywords: [],
                url: {
                  label: "",
                  href: "",
                },
              },
              {
                id: "19",
                visible: true,
                name: "Android Application - 'Trax'",
                description: "",
                summary: "",
                keywords: [],
                url: {
                  label: "",
                  href: "",
                },
              },
              {
                id: "20",
                visible: true,
                name: "Data Cleaning & Preprocessing for Big Data",
                description: "",
                summary: "",
                keywords: [],
                url: {
                  label: "",
                  href: "",
                },
              },
              {
                id: "21",
                visible: true,
                name: "Big Data Analytics with Hadoop and Spark",
                description: "",
                summary: "",
                keywords: [],
                url: {
                  label: "",
                  href: "",
                },
              },
              {
                id: "22",
                visible: true,
                name: "Customer Segmentation Using K-means Clustering",
                description: "",
                summary: "",
                keywords: [],
                url: {
                  label: "",
                  href: "",
                },
              },
              {
                id: "23",
                visible: true,
                name: "Web Scraping and Data Mining for Market Analysis",
                description: "",
                summary: "",
                keywords: [],
                url: {
                  label: "",
                  href: "",
                },
              },
              {
                id: "24",
                visible: true,
                name: "Data Mining with Apriori Algorithm",
                description: "",
                summary: "",
                keywords: [],
                url: {
                  label: "",
                  href: "",
                },
              },
              {
                id: "25",
                visible: true,
                name: "Classification with K-Nearest Neighbors (KNN)",
                description: "",
                summary: "",
                keywords: [],
                url: {
                  label: "",
                  href: "",
                },
              },
              {
                id: "26",
                visible: true,
                name: "Logistic Regression Model for Binary Classification",
                description: "",
                summary: "",
                keywords: [],
                url: {
                  label: "",
                  href: "",
                },
              },
            ],
          },
          profiles: {
            name: "Profiles",
            columns: 1,
            visible: true,
            id: "profiles",
            items: [],
          },
          publications: {
            name: "Publications",
            columns: 1,
            visible: true,
            id: "publications",
            items: [],
          },
          references: {
            name: "References",
            columns: 1,
            visible: true,
            id: "references",
            items: [
              {
                id: "f2sv5z0cce6ztjl87yuk8fak",
                visible: true,
                name: "Available upon request",
                description: "",
                summary: "",
                url: {
                  label: "",
                  href: "",
                },
              },
            ],
          },
          interests: {
            name: "Interests",
            columns: 1,
            visible: true,
            id: "interests",
            items: [],
          },
          languages: {
            name: "Languages",
            columns: 1,
            visible: true,
            id: "languages",
            items: [],
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

    useResumeStore.setState({ resume });
    useResumeStore.temporal.getState().clear();

    return resume;
  } catch {
    return redirect("/dashboard");
  }
};
