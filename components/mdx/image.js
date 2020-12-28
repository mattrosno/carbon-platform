import Image from 'next/image';
import styles from './mdx.module.scss';

const Img = ({ alt, height, src, width }) => (
  <Image
    alt={alt}
    className={styles.image}
    height={height}
    layout="responsive"
    src={src}
    width={width}
  />
);

export default Img;
