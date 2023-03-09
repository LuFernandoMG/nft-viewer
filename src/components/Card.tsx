import styles from "@/styles/Card.module.css";
import Image from "next/image";

type Props = {
  nft: {
    description: string;
    title: string;
    rawMetadata: {
      image: string;
    };
    timeLastUpdated: string;
  };
  setSelected: any;
  setOpenModal: any;
};

const Card = (props: Props) => {
  const { nft, setSelected,setOpenModal } = props;

  const selectNFT = () => {
    setSelected(nft);
    setOpenModal(true);
  };

  return (
    <div className={styles.card_wrapper} onClick={selectNFT}>
      <div className={styles.image_wrapper}>
        {nft.rawMetadata.image && (
          <Image
            className={styles.image}
            src={nft.rawMetadata.image}
            fill
            alt="This is the Raw Metadata image of the NFT"
          />
        )}
      </div>
      <div className={styles.body}>
        <h2 className={styles.name}>{nft.title}</h2>
        <p className={styles.description}>{nft.description}</p>
        <span className={styles.creation}>
          {nft.timeLastUpdated.substring(0, 10)}
        </span>
      </div>
      <div className={styles.mouse_position}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Card;
