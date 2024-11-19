
import { Input } from "s/components/ui/input"
import { Label } from "s/components/ui/label"

export default function InputFile() {
  return (
    <div className="grid w-full lg:max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" />
    </div>
  )
}
