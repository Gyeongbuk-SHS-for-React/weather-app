import { DownCircleFilled, UpCircleFilled } from '@ant-design/icons'
import DownButtonStyle from '../Styles/DownButtonStyle'

function DownButton(props) {
  const { upDown } = props
  return (
    <DownButtonStyle>
      {upDown ? (
        <DownCircleFilled
          onClick={() => {
            console.log("abcd")
          }}
        />
      ) : (
        <UpCircleFilled
          onClick={() => {
            console.log("dcba")
          }}
        />
      )}

    </DownButtonStyle>
  )
}

export default DownButton
