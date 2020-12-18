import { notification } from "antd"

export const successToastMessage = (message) => {
  notification.success({
    message,
  })
}
