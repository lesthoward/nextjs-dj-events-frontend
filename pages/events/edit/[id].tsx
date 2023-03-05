import 'react-toastify/dist/ReactToastify.css';
import styles from '@/styles/Form.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import { API_URL } from '@/config/index';
import { IUniqueEventResponse } from 'types/interface';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import moment from 'moment';
import Image from 'next/image';
import * as Icons from 'react-icons/fa';
import { Modal } from '@/components/Modal';

const EditEvent = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { event } = props;
  const [values, setValues] = useState({
    name: event ? event.data?.attributes.name : '',
    performers: event ? event.data?.attributes.performers : '',
    venue: event ? event.data?.attributes.venue : '',
    address: event ? event.data?.attributes.address : '',
    date: event ? event.data?.attributes.date : '',
    time: event ? event.data?.attributes.time : '',
    description: event ? event.data?.attributes.description : '',
  });
  const [showModal, setShowModal] = useState(false);

  const [imagePreview] = useState(
    event && event.data?.attributes.image
      ? event.data?.attributes.image.data?.attributes.formats.medium.url
      : null
  );
  const router = useRouter();

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const isFormFilled = Object.values(values).every((value) => value !== '');

    if (!isFormFilled) {
      return toast.error('Please fill all the fields');
    }

    const res = await fetch(`${API_URL}/api/events/${event?.data?.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: values,
      }),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error('No token included');
        return;
      }
      toast.error('Something Went Wrong');
    } else {
      const evt: IUniqueEventResponse = await res.json();
      if (evt.data) {
        return router.push(`/events/${evt.data.attributes.slug}`);
      }
      toast.error('Something Went Wrong');
    }
  };

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const showModalHandler = (state: boolean) => {
    setShowModal(state);
  };

  return (
    <Layout
      title="Add New Event"
      description="Add new DJ and other musical events"
    >
      <Link href="/events">Go back</Link>
      <h1>Edit Event</h1>

      <ToastContainer />

      <form onSubmit={submitFormHandler} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={inputChangeHandler}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={values.performers}
              onChange={inputChangeHandler}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={values.venue}
              onChange={inputChangeHandler}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address}
              onChange={inputChangeHandler}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={
                event
                  ? moment(event.data?.attributes.date).format('yyyy-MM-DD')
                  : values.date
              }
              onChange={inputChangeHandler}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={values.time}
              onChange={inputChangeHandler}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            name="description"
            id="description"
            value={values.description}
            onChange={inputChangeHandler}
          ></textarea>
        </div>

        <input type="submit" value="Update Event" className="btn" />
      </form>

      <h2>Event Image</h2>
      {imagePreview ? (
        <Image src={imagePreview} alt="Event Image" height={100} width={170} />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}

      <div>
        <button
          className="btn-secondary"
          onClick={() => showModalHandler(true)}
        >
          <Icons.FaImage />
          <span> Set Image</span>
        </button>
      </div>

      <Modal
        enabled={showModal}
        onClose={() => showModalHandler(false)}
        title="Image Upload"
      >
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit
          laudantium illum ab explicabo voluptatibus dolorem ullam excepturi
          nostrum, commodi, illo libero. Quam amet, consequuntur consectetur
          saepe laborum nemo molestias sequi!
        </p>
      </Modal>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  event?: IUniqueEventResponse;
}> = async (props) => {
  const { params } = props;
  const { id } = params as any;
  const res = await fetch(`${API_URL}/api/events/${id}?populate=image`);
  const eventData: IUniqueEventResponse = await res.json();
  return {
    props: {
      event: eventData,
    },
  };
};

export default EditEvent;
