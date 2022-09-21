import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckOutlined, EditOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import Button from "@iso/components/uielements/button";
import CdnList from "./PageContent/CdnList";
import SingleContactView from "./PageContent/SingleViewCdn";
import EditCdnView from "./PageContent/EditCdn";
import AddCdnView from "./PageContent/AddCdn";
import { otherAttributes } from "./const";
import { ContactsWrapper } from "./Cdn.styles";
import Scrollbar from "@iso/components/utility/customScrollBar";
import actions from "@iso/redux/cdn/actions";
import actionRole from "@iso/redux/role/actions";
import notification from "@iso/components/Notification";
import LazyLoadingSpin from "@iso/components/LazyLoadingSpin";

const { Content } = Layout;
export default function Account() {
  const { listRole } = useSelector((state) => state.Role);
  const { listCdn, loading, versionId, contentVersion, loadingViewContent, editView, addCdn, statusAddCdn } = useSelector((state) => state.Cdn);

  const dispatch = useDispatch();
  const [textSearch, setTxtSearch] = useState("");
  const [valueTextarea, setValueTextarea] = useState("");
  const [platform, setPlatform] = useState("");
  const [valueAddCdn, setValueAddCdn] = useState("");
  const [versionAdd, setVersionAdd] = useState("");
  const [platformAdd, setPlatformAddVersion] = useState("");

  console.log("asdkfjkasdhfa", loading);

  useEffect(() => {
    dispatch({
      type: actions.GET_LIST_CDN,
    });
  }, []);

  useEffect(() => {
    if (listRole.length > 0) return listRole;

    dispatch({
      type: actionRole.GET_ALL_ROLE,
      payload: {
        txtSearch: "",
        limit: 20,
        page: 1,
      },
    });
  }, [dispatch, listRole]);

  useEffect(() => {
    statusAddCdn &&
      dispatch({
        type: actions.GET_LIST_CDN,
      });
  }, [statusAddCdn]);

  const handleChangeTextarea = (value) => {
    setValueAddCdn(value.target.value);
  };

  const onVIewChange = () => {
    if (!editView) {
      dispatch(actions.viewChange(!editView));
    } else {
      try {
        if (addCdn) {
          if (!valueAddCdn || !platformAdd || !versionAdd) return notification("error", "Invalid value", "");
          dispatch(actions.editVersion({ ...JSON.parse(valueAddCdn), version: versionAdd, platform: platformAdd }));
        } else {
          dispatch(actions.editVersion({ ...JSON.parse(valueTextarea), version: versionId, platform }));
        }
      } catch (e) {
        notification("error", e.toString(), "");
      }
    }
  };

  return (
    <ContactsWrapper className="isomorphicContacts" style={{ background: "none" }}>
      <div className="isoContactListBar">
        <LazyLoadingSpin loading={loading}>
          <CdnList
            textSearch={textSearch}
            setTxtSearch={setTxtSearch}
            data={listCdn}
            selectedId={versionId}
            changeContact={(id, platform) => {
              dispatch(actions.changeVersionId(id));
              setPlatform(platform);
              dispatch(actions.viewVersionContent({ version: id, platform }));
            }}
          />
        </LazyLoadingSpin>
      </div>
      <Layout className="isoContactBoxWrapper">
        <Content className="isoContactBox">
          <div className="isoContactControl">
            <Button type="default" onClick={onVIewChange}>
              {editView || addCdn ? <CheckOutlined /> : contentVersion ? <EditOutlined /> : ""}
            </Button>

            <Button type="primary" onClick={() => dispatch({ type: actions.ADD_CDN_ACTION })} className="isoAddContactBtn">
              Add Cdn
            </Button>
          </div>

          <Scrollbar className="contactBoxScrollbar">
            {addCdn ? (
              <AddCdnView handleChangeTextarea={handleChangeTextarea} valueAddCdn={valueAddCdn} setVersionAdd={setVersionAdd} setPlatformAddVersion={setPlatformAddVersion} />
            ) : editView ? (
              <EditCdnView
                contact={contentVersion}
                editContact={(contact) => {
                  setValueTextarea(contact.target.value);
                }}
                otherAttributes={otherAttributes}
              />
            ) : (
              <LazyLoadingSpin loading={loadingViewContent}>
                <SingleContactView contact={contentVersion} />
              </LazyLoadingSpin>
            )}
          </Scrollbar>
        </Content>
      </Layout>
    </ContactsWrapper>
  );
}
