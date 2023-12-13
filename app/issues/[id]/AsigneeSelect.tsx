'use client';

import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

const AsigneeSelect = () => {

  const { data: users, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async() => {
      const fetchedUsers = await fetch("/api/users");
      const formattedUsers = await fetchedUsers.json() as User[];
      return formattedUsers;
    },
    staleTime: 60*1000, // 60s
    retry: 3
  })
  if(isLoading) return <Skeleton />;
  if(error) return null;


  
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          { users?.map( user => (
            <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>)
          )}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AsigneeSelect;
