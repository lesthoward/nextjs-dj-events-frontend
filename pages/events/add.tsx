import 'react-toastify/dist/ReactToastify.css';
import styles from '@/styles/Form.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import { API_URL } from '@/config/index';
import { IEventPOSTResponse } from 'types/interface';

const AddEvent = () => {
  const [values, setValues] = useState({
    name: '',
    performers: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    description: '',
  });
  const router = useRouter();

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const isFormFilled = Object.values(values).every((value) => value !== '');

    if (!isFormFilled) {
      return toast.error('Please fill all the fields');
    }

    const res = await fetch(`${API_URL}/api/events`, {
      method: 'POST',
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
      const evt: IEventPOSTResponse = await res.json();
      console.log(JSON.stringify(evt));
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

  return (
    <Layout
      title="Add New Event"
      description="Add new DJ and other musical events"
    >
      <Link href="/events">Go back</Link>
      <h1>Add Event</h1>

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
              value={values.date}
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

        <input type="submit" value="Add Event" className="btn" />
      </form>
    </Layout>
  );
};

export default AddEvent;
