// Define the shape of our dummy video links
interface DummyVideoLinks {
    [classNumber: string]: {
      [subject: string]: {
        [topic: string]: string[];
      };
    };
  }

 export const dummyVideoLinks: DummyVideoLinks = {
    "8": {
      Maths: {
        Algebra: [
          "https://www.youtube.com/embed/vNwAmxshN8Y?si=kbjkYQy5I4CtIkme",
        ],
        Geometry: [
          "https://www.youtube.com/embed/C8ywY61EDGQ?si=aqKx3bt-7te6bPPd" ,
        ],
        Trigonometry: [
          "https://www.youtube.com/embed/T9lt6MZKLck?si=muheEk2MudeZheOm",
        ],
      },
      Science: {
        Biology: [
          "https://www.youtube.com/embed/TxaIgV0E598?si=gQYhr54i9lUjHibC",
        ],
        Physics: [
          "https://www.youtube.com/embed/B6mi1-YoRT4?si=j6RDkGKyXeSi3o22",
        ],
        Chemistry: [
          "https://www.youtube.com/embed/vgRjacM6cys?si=h_Ml8GDLtlIEkGBZ",
        ],
      },
      Social: {
        History: [
          "https://www.youtube.com/embed/akw0GJ8YpA0?si=uNIUPK4mLUv9NLT9",
        ],
        Geography: [
          "https://www.youtube.com/embed/1-FRZRvLxFw?si=g0rmFw2mz2DA9s3H",
        ],
        Economics: [
          "https://www.youtube.com/embed/Mm4k_LLRZgM?si=WweHIf-griH43i8N",
        ],
      },
    },
    "9": {
      Maths: {
        Algebra: [
          "https://www.youtube.com/embed/5iTOphGnCtg?si=5_0Dmb9FZ98ALREt",
        ],
        Geometry: [
          "https://www.youtube.com/embed/5iTOphGnCtg?si=5_0Dmb9FZ98ALREt",
        ],
        Trigonometry: [
          "https://www.youtube.com/embed/5iTOphGnCtg?si=5_0Dmb9FZ98ALREt",
        ],
      },
      Science: {
        Biology: [
          "https://www.youtube.com/embed/5iTOphGnCtg?si=5_0Dmb9FZ98ALREt",
        ],
        Physics: [
          "https://www.youtube.com/embed/5iTOphGnCtg?si=5_0Dmb9FZ98ALREt",
        ],
        Chemistry: [
          "https://www.youtube.com/embed/5iTOphGnCtg?si=5_0Dmb9FZ98ALREt",
        ],
      },
      Social: {
        History: [
          "https://www.youtube.com/embed/5iTOphGnCtg?si=5_0Dmb9FZ98ALREt",
        ],
        Geography: [
          "https://www.youtube.com/embed/5iTOphGnCtg?si=5_0Dmb9FZ98ALREt",
        ],
        Economics: [
          "https://www.youtube.com/embed/5iTOphGnCtg?si=5_0Dmb9FZ98ALREt",
        ],
      },
    },
    // Add additional classes as needed
  };
  
  export default dummyVideoLinks;
  