import {
  DeleteObjectsCommand,
  ListObjectsV2Command,
  S3Client,
} from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: process.env.S3_REGION!,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
});


export async function deleteUserDataFromS3(prefix: string): Promise<number> {
  let totalDeleted = 0;
  let continuationToken: string | undefined;

  do {
    const list = await s3.send(
      new ListObjectsV2Command({
        Bucket: process.env.S3_BUCKET!,
        Prefix: prefix,
        ContinuationToken: continuationToken,
      }),
    );

    const objects = list.Contents?.map((item) => ({ Key: item.Key! })) || [];

    if (objects.length > 0) {
      const result = await s3.send(
        new DeleteObjectsCommand({
          Bucket: process.env.S3_BUCKET!,
          Delete: { Objects: objects },
        }),
      );

      if (result.Errors?.length) {
        throw new Error("Some S3 objects could not be deleted");
      }

      totalDeleted += result.Deleted?.length ?? 0;
    }

    continuationToken = list.NextContinuationToken;
    
  } while (continuationToken);

  return totalDeleted;
};
