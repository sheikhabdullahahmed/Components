export type StoredFile = {
  // Public URL to show the file.
  url: string;
  // Provider-specific id, kept so the file can be deleted later.
  key: string;
};

// Where uploaded files live. Cloudinary today; add an S3 implementation later and
// switch it in StorageModule without touching any feature code.
export abstract class StorageService {
  abstract upload(file: Buffer, folder: string): Promise<StoredFile>;
  abstract delete(key: string): Promise<void>;
}
