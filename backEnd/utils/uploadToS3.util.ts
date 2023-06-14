import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { parse } from "url";
const client = new S3Client({});

export const uploadImageToS3 = async (fileData: Buffer, fileName: string) => {
  try {
    const cmd = new PutObjectCommand({
      Bucket: `${process.env.AWS_BUCKET_NAME}`,
      Key: fileName,
      Body: fileData,
    });

    const res = await client.send(cmd);
    const bucketUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com`;
    const fileUrl = parse(`${bucketUrl}/${fileName}`, true).href;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
};
