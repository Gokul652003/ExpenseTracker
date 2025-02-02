import { useState } from 'react';
import { TextField } from '../../react-components/TextField/TextField';
import { supabase } from '../../supabase/supabaseClient';
import { toast } from 'sonner';

export const SecurityPrivacy = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSaveChanges = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Step 1: Get the current user
    const { data: user, error: userError } = await supabase.auth.getUser();

    if (userError) {
      setError(userError.message);
      return;
    }

    if (user) {
      // Step 2: Update the password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        setError(updateError.message);
      } else {
        toast.success('Password updated successfully');
        setNewPassword('');
        setConfirmPassword('');
      }
    } else {
      setError('User is not logged in.');
    }
  };

  return (
    <div className="flex flex-col gap-8 p-8 w-[800px]">
      <h1 className="text-2xl text-textColor">Security & Privacy</h1>
      <div className="flex gap-3 pb-5">
        <div className="flex-1">
          <TextField
            type="password"
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <TextField
            type="password"
            label="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            description={error ?? ''}
          />
        </div>
      </div>
      <div>
        <button
          className="px-4 py-2 rounded-lg bg-tableBgDark text-textColor"
          onClick={handleSaveChanges}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};
