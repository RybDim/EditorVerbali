import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SectionSelectorProps {
  sezioni: string[];
  setSezioni: React.Dispatch<React.SetStateAction<string[]>>;
}

export function SectionSelector({ sezioni, setSezioni }: SectionSelectorProps) {
  const [value, setValue] = useState<string | null>(null);

  const handleAdd = useCallback(() => {
    if (value && !sezioni.includes(value)) {
      setSezioni((prev) => [...prev, value]);
    }
  }, [sezioni, value, setSezioni]);

  return (
    <div className="flex space-x-2">
      <Select onValueChange={setValue}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sottosezioni" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="Assegni di ricerca">
              Assegni di ricerca
            </SelectItem>
            <SelectItem value="Borse di studio">Borse di studio</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button type="button" size={"sm"} onClick={handleAdd}>
        Aggiungi
      </Button>
    </div>
  );
}