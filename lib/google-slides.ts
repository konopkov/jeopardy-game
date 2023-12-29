import { Credentials } from "./session";

export type Presentation = {
  presentationId: string;
  title: string;
};

export type PresentationInput = {
  title: string;
};

const API_URL = "https://slides.googleapis.com/v1/presentations";

export const createPresentation = async (
  input: PresentationInput,
  credentials: Credentials
): Promise<Presentation> => {
  const resp = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${credentials.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: input.title,
    }),
  });

  const response = await resp.json();
  console.log({ response });

  // @ts-ignore
  if (response.error) {
    console.log("Error creating presentation");
    // @ts-ignore
    throw new Error(response.error.message);
  }
  return response;
};

export const getPresentation = async (
  presentationId: string,
  credentials: Credentials
): Promise<Presentation> => {
  const resp = await fetch(`${API_URL}/${presentationId}`, {
    headers: {
      Authorization: `Bearer ${credentials.accessToken}`,
    },
  });

  return resp.json();
};

export const batchUpdate = async (
  presentationId: string,
  requests: any[],
  credentials: Credentials
) => {
  const resp = await fetch(`${API_URL}/${presentationId}:batchUpdate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${credentials.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      requests,
    }),
  });

  const response = await resp.json();
  console.log({ response });
  return response;
};

export const getPresentationEditLink = (id: string): string => {
  return `https://docs.google.com/presentation/d/${id}/edit`;
};

type SlideData = {
  categoryId: string;
  categoryName: string;
  price: number;
};

type SlideType = "question" | "answer";

const getSlideId = (slideType: SlideType, data: SlideData) => {
  const { categoryId, price } = data;
  return `category_${categoryId}_price_${price}_${slideType}`;
};

const createSlideRequest = (slideType: SlideType, data: SlideData) => {
  const { categoryId, price } = data;

  return {
    createSlide: {
      objectId: getSlideId(slideType, data),
      slideLayoutReference: {
        predefinedLayout: "BLANK",
      },
    },
  };
};

const getCategoryTexId = (slideType: SlideType, data: SlideData) => {
  const { categoryId, price } = data;
  return `category_${categoryId}_price_${price}_${slideType}_text_box`;
};

const createTextRequests = (slideType: SlideType, data: SlideData) => {
  const { categoryName, price } = data;

  return [
    {
      createShape: {
        objectId: getCategoryTexId(slideType, data),
        shapeType: "TEXT_BOX",
        elementProperties: {
          pageObjectId: getSlideId(slideType, data),
          size: {
            width: {
              magnitude: 3000000,
              unit: "EMU",
            },
            height: {
              magnitude: 3000000,
              unit: "EMU",
            },
          },
          transform: {
            scaleX: 1.5,
            scaleY: 0.1,
            translateX: 40775,
            translateY: 39075,
            unit: "EMU",
          },
        },
      },
    },
    {
      insertText: {
        objectId: getCategoryTexId(slideType, data),
        insertionIndex: 0,
        text: `${categoryName} - ${price} - ${slideType}`,
      },
    },
  ];
};

export type Category = {
  categoryId: string;
  name: string;
};

export const createAllSlides = (
  presentationId: string,
  categories: Category[],
  credentials: Credentials
) => {
  const requests = categories.flatMap((category) => {
    return [100, 200, 300, 400, 500].flatMap((price) => {
      return templateSlideRequestsForCategory({
        categoryId: category.categoryId,
        categoryName: category.name,
        price,
      });
    });
  });

  return batchUpdate(presentationId, requests, credentials);
};

export const templateSlideRequestsForCategory = (input: SlideData) => {
  const requests = [
    createSlideRequest("question", input),
    ...createTextRequests("question", input),
    createSlideRequest("answer", input),
    ...createTextRequests("answer", input),
  ];
  return requests;
};
