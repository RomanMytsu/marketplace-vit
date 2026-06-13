import { useTitle } from "@/shared/lib/hooks/useTitle"
import s from "./PersonalPack.module.scss"

const PersonalPack = () => {
  useTitle("Personal Pack")
  return <div className={s.personalPack}></div>
}

export default PersonalPack
