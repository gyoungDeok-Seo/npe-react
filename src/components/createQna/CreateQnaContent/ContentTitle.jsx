import { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import { CreateQnaDataContext } from "../../../context/CreateQnaDataContext";

const CreateQnaContentTitlebox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

const CreateQnaContentTitleTextarea = styled.textarea`
  -moz-appearance: none;
  appearance: none;
  background-color: #fff;
  border-color: #94a3b8;
  border-radius: 0;
  color: #0f172a;
  line-height: 1.5;
  font-weight: 700;
  font-size: 1.5rem;
  padding: 0;
  border-width: 0;
  resize: none;
  width: 100%;
  outline: none;
  overflow: hidden; /* Ensure no scrollbar is shown */
`;

const CreateQnaContentTitleCountBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CreateQnaContentTitleCount = styled.p`
  color: #64748b;
  font-size: 0.875rem;
  margin-left: auto;
`;

function ContentTitle() {
  const { datas, setDatas } = useContext(CreateQnaDataContext);
  const [titleLength, setTitleLength] = useState(0);
  const textareaRef = useRef(null);

  const handleTitleChange = (e) => {
    const value = e.target.value;
    const valueLength = value.length;
    setTitleLength(valueLength);
    if (valueLength <= 100) {
      setDatas((prev) => ({
        ...prev,
        title: value,
      }));
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [datas.title]);

  return (
    <CreateQnaContentTitlebox>
      <CreateQnaContentTitleTextarea
        name="title"
        maxLength={100}
        placeholder="제목을 10자 이상 입력해 주세요."
        value={datas.title}
        onChange={handleTitleChange}
        ref={textareaRef}
      />
      <CreateQnaContentTitleCountBox>
        <CreateQnaContentTitleCount>
          {titleLength} / 100
        </CreateQnaContentTitleCount>
      </CreateQnaContentTitleCountBox>
    </CreateQnaContentTitlebox>
  );
}

export default ContentTitle;