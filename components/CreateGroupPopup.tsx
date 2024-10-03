import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getCurrentUser } from '@/app/api/auth/session'
import { useChat } from '@/context/ChatContext'

const CreateGroupPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [groupName, setGroupName] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const { loginUser } = useChat()

  const handleCreateGroup = async () => {
    setLoading(true)
    setError(null)

    if (!groupName.trim()) {
      setError('Group name is required')
      setLoading(false)
      return
    }

    try {
      const session = await getCurrentUser()
      const token = session?.accessToken
      if (!token) {
        setError('Authorization token is missing')
        setLoading(false)
        return
      }

      const response = await fetch('/api/createGroup', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ group_name: groupName })
      })

      const data = await response.json()
      if (!response.ok) {
        setError(data.message || 'Failed to create group')
      } else {
        alert('Group created successfully!')
        const newGroup = {
          id: data.data.data.id,
          name: data.data.data.name,
          created_by: data.data.data.created_by,
          created_at: data.data.data.created_at,
          updated_at: data.data.data.updated_at
        }

        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')
        const currentUser = storedUsers.find((user: { id: string }) => user.id === loginUser?.id)

        if (currentUser) {
          // Initialize groupList if it doesn't exist
          if (!currentUser.groupList) {
            currentUser.groupList = [] // Create a new groupList
          }

          // Add new group to the groupList
          currentUser.groupList.push(newGroup)

          const updatedUsers = storedUsers.map((user: { id: string }) =>
            user.id === loginUser?.id ? currentUser : user
          )

          localStorage.setItem('users', JSON.stringify(updatedUsers))
        }

        onClose()
      }
    } catch (error) {
      setError('An error occurred while creating the group')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
          <DialogDescription>
            Please enter a name for the new group. This will be used to identify the group in your chat list.
          </DialogDescription>
        </DialogHeader>
        <div>
          {/* Form content for creating group */}
          <Input
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="mb-4"
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleCreateGroup} disabled={loading}>
            {loading ? 'Creating...' : 'Create'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateGroupPopup
