import { Modal } from "@shopify/polaris";
import { useState } from "react";
import { Image } from "antd";
import { useAPI } from "../store/Getshop";

export default function ImageSwatch(props) {
  const { getShop } = useAPI();
  const [active, setActive] = useState(true);
  const [url, seturl] = useState("");
  const toggleActiveInActive = () => {
    setActive(false);
    props.showimagedrop(false);
  };
  const toggleActive = (e) => {
    toggleActiveInActive();
    props.selectedimage(url, props.count);
  };

  const redirect = () => {
    window.open(`https://${getShop}/admin/settings/files`, "_blank");
  };

  const geturl = (e) => {
    seturl(e.target.value);
  };

  return (
    <div style={{ height: "500px" }}>
      <Modal
        large
        // activator={activator}
        open={active}
        onClose={toggleActiveInActive}
        title="Image Section"
        primaryAction={{
          content: "Add image ",
          onAction: toggleActive,
        }}
      >
        <Modal.Section>
          <div className="mainimagediv">
            <p className="parahead">
              First visit the Files section of your shopify store and then
              upload the image there afterwards copy image link from there and
              paste it in the box below.
            </p>
            {/* <div>
            <video width="300" height="200" controls  src="https://youtu.be/j_18UV939DM"></video>
            </div> */}

<a href="shopify://admin/products" >Products page</a>

            <a className="fileslink" onClick={redirect}>
              Click here to go to shopify files section
            </a>

            <div>
              {/* <p>Image preview</p> */}
              <Image width={200} src={url} />
            </div>
            <div>
              <input
                className="sd-image-upload"
                value={url}
                onChange={geturl}
                placeholder="paste image url here"
              />
            </div>
          </div>
        </Modal.Section>
      </Modal>
    </div>
  );
}
