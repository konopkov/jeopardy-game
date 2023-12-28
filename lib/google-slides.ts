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

  return resp.json();
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
  categoryId: number;
  categoryName: string;
  price: number;
  slideType: "question" | "answer";
};

const getSlideId = (data: SlideData) => {
  const { categoryId, price, slideType } = data;
  return `category_${categoryId}_price_${price}_${slideType}`;
};

const createSlideRequest = (data: SlideData) => {
  const { categoryId, price, slideType } = data;

  return {
    createSlide: {
      objectId: getSlideId(data),
      slideLayoutReference: {
        predefinedLayout: "BLANK",
      },
    },
  };
};

const getCategoryTexId = (data: SlideData) => {
  const { categoryId, price, slideType } = data;
  return `category_${categoryId}_price_${price}_${slideType}_text_box`;
};

const createTextRequests = (data: SlideData) => {
  const { categoryName } = data;

  return [
    {
      createShape: {
        objectId: getCategoryTexId(data),
        shapeType: "TEXT_BOX",
        elementProperties: {
          pageObjectId: getSlideId(data),
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
        objectId: getCategoryTexId(data),
        insertionIndex: 0,
        text: `Category: ${categoryName}`,
      },
    },
  ];
};

export const createTemplateSlide = async (
  presentationId: string,
  input: SlideData,
  credentials: Credentials
) => {
  const requests = [createSlideRequest(input), ...createTextRequests(input)];
  console.log({ requests });

  return await batchUpdate(presentationId, requests, credentials);
};
