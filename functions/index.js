const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors");
const { v2: cloudinary } = require("cloudinary");

admin.initializeApp();

const corsHandler = cors({ origin: true });

const getCloudinaryConfig = () => {
  const config = functions.config().cloudinary || {};
  const { cloud_name, api_key, api_secret } = config;

  if (!cloud_name || !api_key || !api_secret) {
    throw new Error("Missing Cloudinary config in Firebase Functions.");
  }

  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
  });

  return { cloud_name, api_key, api_secret };
};

const normalizeParams = (params) => {
  if (!params || typeof params !== "object") {
    return {};
  }

  return Object.keys(params)
    .sort()
    .reduce((acc, key) => {
      if (params[key] !== undefined && params[key] !== null) {
        acc[key] = String(params[key]);
      }
      return acc;
    }, {});
};

exports.signCloudinaryUpload = functions.https.onRequest((req, res) => {
  corsHandler(req, res, () => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    try {
      const { api_secret } = getCloudinaryConfig();
      const paramsToSign = normalizeParams(req.body?.paramsToSign);

      if (!paramsToSign.timestamp) {
        return res.status(400).json({ error: "Missing timestamp" });
      }

      const signature = cloudinary.utils.api_sign_request(
        paramsToSign,
        api_secret,
      );

      return res.json({ signature });
    } catch (error) {
      return res.status(500).json({ error: error.message || "Signing failed" });
    }
  });
});

exports.getSignedDeliveryUrl = functions.https.onRequest((req, res) => {
  corsHandler(req, res, () => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    try {
      getCloudinaryConfig();
      const { publicId, resourceType } = req.body || {};

      if (!publicId) {
        return res.status(400).json({ error: "Missing publicId" });
      }

      const expiresAt = Math.floor(Date.now() / 1000) + 5 * 60;
      const url = cloudinary.url(publicId, {
        secure: true,
        sign_url: true,
        resource_type: resourceType || "image",
        type: "authenticated",
        expires_at: expiresAt,
      });

      return res.json({ url, expiresAt });
    } catch (error) {
      return res.status(500).json({ error: error.message || "Failed to sign" });
    }
  });
});
