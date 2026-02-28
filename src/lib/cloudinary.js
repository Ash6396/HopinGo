const FUNCTIONS_BASE_URL = import.meta.env.VITE_FUNCTIONS_BASE_URL;

const getFunctionsUrl = (path) => {
  if (!FUNCTIONS_BASE_URL) {
    throw new Error("Missing VITE_FUNCTIONS_BASE_URL");
  }

  return `${FUNCTIONS_BASE_URL.replace(/\/$/, "")}/${path}`;
};

export const fetchCloudinarySignature = async (paramsToSign) => {
  const response = await fetch(getFunctionsUrl("signCloudinaryUpload"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ paramsToSign }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || "Failed to sign upload");
  }

  const data = await response.json();
  return data.signature;
};

export const fetchSignedDeliveryUrl = async (publicId) => {
  const response = await fetch(getFunctionsUrl("getSignedDeliveryUrl"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ publicId }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || "Failed to fetch signed URL");
  }

  const data = await response.json();
  return data.url;
};
