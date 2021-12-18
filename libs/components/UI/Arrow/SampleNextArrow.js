import {RightCircleOutlined  } from '@ant-design/icons';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;

  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    >
      <RightCircleOutlined style={{color:"#bbb"}}/>
    </div>
  );
}
export default SampleNextArrow;