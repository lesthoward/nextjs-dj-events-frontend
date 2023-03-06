import { useState, ChangeEvent, FormEvent } from 'react';
import { API_URL } from '../config';
import styles from '@/styles/Form.module.css';

interface IImageUploadProps {
  eventId: number | string;
  uploadImageHandler: (image: File) => void;
}

export const ImageUpload = (props: IImageUploadProps) => {
  const { eventId, uploadImageHandler } = props;
  const [image, setImage] = useState<File | null>(null);

  const submitFormHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (image) {
      const formData = new FormData();
      formData.append('files', image);
      formData.append('ref', 'api::event.event');
      formData.append('refId', `${eventId}`);
      formData.append('field', 'image');

      const res = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      console.log(res);

      if (res.ok) {
        uploadImageHandler(image);
      }

    }
  };

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImage(files[0]);
    }
  };

  return (
    <div className={styles.form}>
      {/* <h1>Upload Event Image</h1> */}
      <form onSubmit={submitFormHandler}>
        <div className={styles.file}>
          <input type="file" onChange={fileChangeHandler} />
        </div>

        <input type="submit" value="Upload" className="btn" />
      </form>
    </div>
  );
};
