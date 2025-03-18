import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // clear existing data
  await prisma.publication.deleteMany();
  await prisma.project.deleteMany();

  console.log("🌱 Start seeding ...");

  // create dummy publication and project
  const publication = await prisma.publication.create({
    data: {
      title:
        "A Review of Multi-Sensor Fusion System for Large Heavy Vehicles Off Road in Industrial Environments",
      abstract:
        "Industry 4.0 or fourth industrial revolution elevates the computerization of Industry 3.0 and enhances it with smart and autonomous systems driven by data and Machine Learning. This paper reviews the advantages and disadvantages of sensors and the architecture of multi-sensor setup for object detection. Here we consider the case of autonomous systems in for large heavy vehicles off-road in industrial environments with the use of camera sensor, LiDAR sensor, and radar sensor. Understanding the vehicles surroundings is a vital task in autonomous operation where personnel and other obstacles present significant hazard of collision. This paper review further discusses the challenges of time synchronisation on sensor data acquisition in multi-modal sensor fusion for personnel and object detection, and details a solution implemented in a Python environment.",
      mainAuthor: "De Jong Yeong",
      CoAuthors: ["John Barry", "Joseph Walsh"],
      link: "https://ieeexplore.ieee.org/document/9180186",
      publisher: "IEEE",
      published: true,
      publishedAt: new Date("2020-08-31"),
    },
  });

  const project = await prisma.project.create({
    data: {
      title: "Online Portfolio V1",
      description:
        "The first iteration of my personal online portfolio. I was interested in learning ReactJS, so I decided to design and build my first version of online portfolio over the weekend would be the best way to learn the fundamentals of ReactJS.",
      year: 2020,
      type: "personal",
      tech: ["ReactJS", "HTML", "CSS", "Material-UI"],
      githubLink: "https://github.com/dejongyeong/web-portfolio",
      previewLink: "https://dejongyeong.github.io/web-portfolio/",
    },
  });

  console.log({ publication, project });
  console.log("🌱 Seeding finished.");
}

main()
  .catch((error) => console.error(error))
  .finally(
    void (async () => {
      await prisma.$disconnect();
    })(),
  );
