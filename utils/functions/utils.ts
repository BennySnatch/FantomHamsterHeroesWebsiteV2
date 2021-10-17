export function trimAddress(addr: string) {
  const trimmed = addr.substr(0, 3) + "..." + addr.substr(addr.length - 3);
  return trimmed;
}
export function trimHash(addr: string) {
  const trimmed = addr.substr(0, 5) + "..." + addr.substr(addr.length - 5);
  return trimmed;
}
export function hashToLink(hash: string) {
  const link = "https://ftmscan.com/tx/" + hash;
  return link;
}
export function uriToLink(uri: string) {
  const link = "https://ipfs.io/ipfs/" + uri;
  return link;
}
export async function metadataFromUri(uri: string) {
  const res = await fetch(uri);
  const { name, description, image } = await res.json();
  return [name, description, image];
}
export async function metadataFromId(id: string) {
  type Meta = {
    name: string;
    description: string;
    image: string;
  };

  const url = "/api/" + id;

  const res = await fetch(url);
  const { name, image, description } = await res.json();
  const meta: Meta = { name, image, description };
  return meta;
}

export const presaleTime = 1634392800;
export const saleTime = 1634400000;

export const ftmscan_api = "ZCUMS9JMEJEW8KIUZZK4F1XVQ6B29EH98X";
export const community_wallet = "0xbCC771cFFC2DEabE62C03aDa1183b6279398C8Ed";

export const base_url =
  "https://api.ftmscan.com/api?module=account&action=balance&address=";

export async function getBalance(addr: string) {
  const res = await fetch(
    base_url + addr + `&tag=latest&apikey=` + ftmscan_api
  );

  const supp = await res.json();
  const bal: string = (supp.result / 1e18).toFixed(2);
  return bal;
}
