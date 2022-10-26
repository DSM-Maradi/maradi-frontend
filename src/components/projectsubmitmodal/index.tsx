import { useState, useRef, useMemo } from "react";
import styled from "styled-components";
import { ImgUpload, XButton } from "../../assets/img";

interface PropsType {
  setModal: (modal: boolean) => void;
}

interface UploadProps {
  file: File;
  thumbnail: string;
  type: string;
}

const ProjectSubmitModal = ({ setModal }: PropsType) => {
  const [image, setImage] = useState<UploadProps | null>();
  const [simpleIntroduce, setSimpleIntroduce] = useState<string>("");
  const RefValue = useRef<HTMLInputElement>(null);
  const onClick = () => {
    setModal(false);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList[0]) {
      const url = URL.createObjectURL(fileList[0]);
      setImage({
        file: fileList[0],
        thumbnail: url,
        type: fileList[0].type.slice(0, 5),
      });
    }
  };
  const showImage = useMemo(() => {
    if (!image && image === undefined) {
      console.log("chekc");
      return (
        <>
          <UploadImg src={ImgUpload} alt="이미지 업로드 사진" />
          <UploadFont>이미지를 업로드 해주세요</UploadFont>
        </>
      );
    }
    return <Image src={image?.thumbnail} alt={image?.type} />;
  }, [image]);
  return (
    <ModalContainer onClick={onClick}>
      <ModalWrapper
        onClick={(e: React.MouseEvent<HTMLFormElement>) => e.stopPropagation()}
      >
        <XWrapper>
          <XBtn src={XButton} onClick={onClick}></XBtn>
        </XWrapper>
        <ImgBlock>
          <ImgUploadContainer htmlFor="input-file">
            {showImage}

            <FileSelector
              ref={RefValue}
              type="file"
              id="input-file"
              accept="image/jpg, image/png, image/jpeg"
              onChange={onChange}
              onClick={() => RefValue.current?.click()}
            />
          </ImgUploadContainer>
          <UploadTextarea
            value={simpleIntroduce}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setSimpleIntroduce(e.target.value)
            }
            placeholder="간단한 설명을 작성해주세요."
          />
        </ImgBlock>
        <PostFormWrapper>
          <PostForm onClick={() => setModal(false)}>
            <PostFormSpan>제출하기</PostFormSpan>
          </PostForm>
        </PostFormWrapper>
      </ModalWrapper>
    </ModalContainer>
  );
};

const Image = styled.img`
  width: 165px;
  height: 120px;
`;

const PostFormWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const XWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const PostForm = styled.div`
  width: 92px;
  height: 48px;
  padding: 14px 18px;
  margin: 10px;
  background: ${({ theme }) => theme.color.main};
  border-radius: 5px;
  justify-content: center;
  cursor: pointer;
`;

const PostFormSpan = styled.span`
  color: ${({ theme }) => theme.color.white};
  font-size: 15px;
`;

const XBtn = styled.img`
  cursor: pointer;
  width: 15px;
  height: 15px;
  margin: 10px;
`;

const FileSelector = styled.input`
  width: 165px;
  height: 120px;
  display: none;
`;

const ImgBlock = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-around;
`;
const UploadTextarea = styled.textarea`
  width: 297px;
  height: 120px;
  font-size: 12px;
  border-radius: 8px;
  resize: none;
  padding: 20px 20px;
  background-color: ${({ theme }) => theme.color.gray100};
  font-family: ${({ theme }) => theme.font.noto};
  ::placeholder {
    color: ${({ theme }) => theme.color.gray900};
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  z-index: 2;
`;
const ModalWrapper = styled.form`
  width: 550px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  background-color: ${({ theme }) => theme.color.white};
  z-index: 3;
  span {
    color: ${({ theme }) => theme.color.white};
    font-size: 15px;
  }
`;

const ImgUploadContainer = styled.label`
  display: flex;
  width: 165px;
  height: 120px;
  cursor: pointer;
  border-radius: 3.75px;
  flex-direction: column;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.gray300};
  justify-content: center;
  align-items: center;
`;

const UploadImg = styled.img`
  margin-bottom: 10px;
`;
const UploadFont = styled.p`
  color: ${({ theme }) => theme.color.gray700};
  font-size: 7.5px;
`;

export default ProjectSubmitModal;