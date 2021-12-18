import {LeftCircleOutlined  } from '@ant-design/icons';

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;

  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    >
      <LeftCircleOutlined style={{color:"#bbb"}} />
    </div>
  );
}
export default SamplePrevArrow;