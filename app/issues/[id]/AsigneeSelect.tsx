'use client';

import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useEffect, useState } from "react";

const AsigneeSelect = () => {
  const [ users, setUsers ]= useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await fetch("/api/users");
      const formattedUsers = await fetchedUsers.json() as User[];
      setUsers(formattedUsers);
    }
    fetchUsers();
  }, [])
  
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          { users.map( user => (
            <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>)
          )}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AsigneeSelect;
