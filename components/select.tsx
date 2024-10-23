"use client";

import { useMemo } from "react";

import { SingleValue } from "react-select";
import CreateableSelect from "react-select/creatable";

type Props = {
  options?: { label: string; value: string }[];
  value?: string | null | undefined;
  disabled?: boolean;
  placeholder?: string;
  onChange: (value?: string) => void;
  onCreate: (value: string) => void;
};

export const Select = ({
  options = [],
  value,
  disabled,
  placeholder,
  onChange,
  onCreate,
}: Props) => {
  const onSelect = (option: SingleValue<{ label: string; value: string }>) => {
    onChange(option?.value);
  };

  const formattedValue = useMemo(() => {
    return options.find((option) => option.value === value);
  }, [options, value]);

  return (
    <CreateableSelect
      className="text-sm h-10"
      placeholder={placeholder}
      options={options}
      value={formattedValue}
      isDisabled={disabled}
      onChange={onSelect}
      onCreateOption={onCreate}
      styles={{
        control: (base) => ({
          ...base,
          borderColor: "#E2E8F0",
          ":hover": {
            borderColor: "#E2E8F0",
          },
        }),
      }}
    />
  );
};
