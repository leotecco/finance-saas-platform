import { useRef, useState } from "react";

import { Select } from "@/components/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";

export const useSelectAccount = (): [
  () => JSX.Element,
  () => Promise<unknown>
] => {
  const accountsQuery = useGetAccounts();
  const accountMutation = useCreateAccount();
  const onCreateAccount = (name: string) => accountMutation.mutate({ name });
  const accountOptions = (accountsQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const selectValue = useRef<string>();

  const [promise, setPromise] = useState<{
    resolve: (value: string | undefined) => void;
  } | null>(null);

  const confirm = () =>
    new Promise((resolve, reject) => {
      setPromise({ resolve });
    });

  const handleConfirm = () => {
    promise?.resolve(selectValue.current);
    setPromise(null);
  };

  const handleCancel = () => {
    promise?.resolve(undefined);
    setPromise(null);
  };

  const ConfirmDialog = () => {
    return (
      <Dialog open={promise !== null} onOpenChange={handleCancel}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Account</DialogTitle>
            <DialogDescription>
              Please select an account to continue.
            </DialogDescription>
          </DialogHeader>
          <Select
            placeholder="Select an account"
            options={accountOptions}
            onCreate={onCreateAccount}
            onChange={(value) => (selectValue.current = value)}
            disabled={accountsQuery.isLoading || accountMutation.isPending}
          />
          <DialogFooter className="pt-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return [ConfirmDialog, confirm];
};
