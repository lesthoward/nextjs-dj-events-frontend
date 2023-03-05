import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Search.module.css';

export const Search = () => {
  const [term, setTerm] = useState('');
  const router = useRouter();

  const inputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/events/search?term=${term}`);
    setTerm('');
  };
  return (
    <div className={styles.search}>
      <form onSubmit={submitFormHandler}>
        <input
          type="text"
          value={term}
          onChange={inputValueHandler}
          placeholder="Search Events"
        />
      </form>
    </div>
  );
};
