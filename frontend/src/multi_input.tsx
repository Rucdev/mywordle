import React, { useState } from "react"
import { Button, Card, TextField, Box, Input } from "@mui/material"
import { styled } from "@mui/material/styles"

type UseMultiInputResult = [string[], () => JSX.Element]
const useMultiInput = (initValue: string[] = [""]): UseMultiInputResult => {
  const [values, setValues] = useState(initValue)

  // 要素を追加
  const addValues = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const tmpValues = values.slice(0)
    tmpValues.splice(Number(e.currentTarget.name) + 1, 0, "")
    setValues(tmpValues)
  }
  // 要素を編集
  const changeValues = (e: React.ChangeEvent<HTMLInputElement>): void => (
    setValues(values.map((value, index) => String(index) === e.currentTarget.name ? e.currentTarget.value : value))
  )
  // 要素を削除
  const removeValues = (e: React.MouseEvent<HTMLButtonElement>): void => (
    setValues(values.filter((_, index) => String(index) !== e.currentTarget.name))
  )

  const render = () => (
    <>
      {
        values.map((value, index) => (
          <div key={index}>
            <StatusCodeInput label="status code" name={String(index)} value={value} onChange={changeValues} />
            <AddButton variant="contained" name={String(index)} onClick={addValues}>追加</AddButton>
            {
              index !== 0 &&
              <DeleteButton variant="contained" name={String(index)} onClick={removeValues}>削除</DeleteButton>
            }
          </div>
        ))
      }
    </>
  )
  return [values, render]
}

export const SimpleMultiInput = () => {
  const [statusCodes, renderInput] = useMultiInput()
  const [dogImgUrls, setDogImgUrls] = useState<string[]>([])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setDogImgUrls(statusCodes.filter((statusCode) => statusCode !== "").map((statusCode) => `https://http.dog/${statusCode}.jpg`))
  }
  return <div style={{ justifyContent: "center" }}>
    <h1>ステータスコードから犬画像を取得</h1>
    <form onSubmit={onSubmit}>
      {renderInput()}
      <Button type="submit" variant="outlined">画像取得</Button>
    </form>
    <Box sx={{ display: 'flex', p: 1 }}>
      {
        dogImgUrls.length > 0 && <>{
          dogImgUrls.map((imgUrl, index) => (
            <Card sx={{ padding: 1, margin: 2 }}>
              <p>status = {statusCodes[index]}</p>
              <img width={200} src={imgUrl} />
            </Card>))
        }</>
      }
    </Box>
  </div>
}

const StatusCodeInput = styled(TextField)({
  marginLeft: "1rem",
  marginRight: "1rem",
  marginBottom: "0.5rem"
})

const AddButton = styled(Button)({
  marginRight: "1rem",
})
const DeleteButton = styled(Button)({
  marginRight: "1rem",
  backgroundColor: "red",
  "&:hover": {
    backgroundColor: "#DF143C",
  },
})