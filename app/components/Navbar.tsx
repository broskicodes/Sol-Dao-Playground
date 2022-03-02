import { Wallet  } from "./Wallet";
import Link from "next/link";
import Image from "next/image";
import {
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { FC } from "react";

export const Navbar: FC = () => {

  return (
    <>
      <nav className="flex justify-between h-16">
        <div className="my-auto flex">
          {/* <Link href="/"> */}
            <a href="/" className="ml-2 font-mono text-2xl hover:underline">
              Contribution Dao
            </a>
          {/* </Link> */}
        </div>
        <div className="flex justify-evenly gap-x-2">
          <div className="my-auto">
            <WalletMultiButton/>
          </div>
        </div>
      </nav>
      <hr />
    </>
  );
}