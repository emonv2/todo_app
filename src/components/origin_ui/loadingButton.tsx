import { Button } from "~/components/ui/button";
import { LoaderCircle } from "lucide-react";

export default function LoadingButton({ text }: { text: string }) {
   return (
      <Button disabled>
         <LoaderCircle
            className="-ms-1 me-2 animate-spin"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
         />
         {text}
      </Button>
   );
}
