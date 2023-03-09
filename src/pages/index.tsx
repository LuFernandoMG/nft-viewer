import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import ReactModal from "react-modal";
import { Parallax } from "react-parallax";
import { Alchemy, Network } from "alchemy-sdk";
import Card from "@/components/Card";
import Input from "@/components/Input";

const config = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY_ALCHEMY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

export default function Home() {
  const [address, setAddress] = useState<string>("");
  const [nfts, setNfts] = useState<any>(undefined);
  const [error, setError] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>(undefined);

  const handleAddress = (e: { target: { value: string } }) => {
    setAddress(e.target.value);
  };

  const manageSearch = async () => {
    const FetchNFT = async () => {
      // Get all NFTs
      const response = await alchemy.nft.getNftsForOwner(address);
      if (response.ownedNfts.length === 0) {
        setOpenModal(true);
        setNfts(response.ownedNfts);
      } else {
        setNfts(response.ownedNfts);
      }
    };

    try {
      await FetchNFT();
    } catch (error) {
      setOpenModal(true);
      setError(true);
    }
  };

  const closeModal = () => {
    setOpenModal(false);
    setError(false);
    setSelected(undefined);
  };

  console.log('')
  return (
    <>
      <Head>
        <title>NonFungiviewer</title>
        <meta
          name="description"
          content="Simple app to check the owned NFTs of a certain address"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Parallax
        bgImage="/background.png"
        bgImageAlt="Background image"
        strength={-1000}
      >
        <main className={styles.main}>
          <div className={styles.container}>
            <Image
              src="/nft-viewer.png"
              width={200}
              height={120}
              alt="Logo NFT Viewer"
            />
            <Input
              action={manageSearch}
              handler={handleAddress}
              value={address}
            />
          </div>
          <div className={styles.grid}>
            {nfts &&
              nfts.length >= 1 &&
              !error &&
              nfts.map((nft: any) => {
                console.log("nft ", nft);
                return (
                  <Card key={nft.id} nft={nft} setOpenModal={setOpenModal} setSelected={setSelected} />
                );
              })}
          </div>
        </main>
        <ReactModal
          isOpen={openModal}
          onRequestClose={closeModal}
          shouldCloseOnOverlayClick
          className={styles.modal}
          overlayClassName={styles.overlay}
        >
          {nfts && nfts.length === 0 && !error && (
            <h3 className={styles.message}>
              This address doesn&apos;t have any NFT in the Ethereum Blockchain
            </h3>
          )}
          {error && (
            <h3 className={styles.message}>Please use a valid address</h3>
          )}
          {nfts && nfts.length >= 1 && !error && selected && (
            <>
              <h2>{selected.title}</h2>
              <br />
              <p>{selected.description}</p>
              <br />
              <span>
                {selected.timeLastUpdated.substring(0, 10)}
              </span>
              <br />
              <span><b>The owner is: </b>{address}</span>
              <br />
              <a href={`https://opensea.io/assets/ethereum/${selected.contract.address}/${selected.tokenId}`} target="_blank">View in Open Sea</a>
            </>
          )}
        </ReactModal>
      </Parallax>
    </>
  );
}
