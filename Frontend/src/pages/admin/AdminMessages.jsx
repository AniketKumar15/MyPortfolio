import { useState } from 'react';
import { 
  useGetMessagesQuery, 
  useDeleteMessageMutation, 
  useMarkMessageAsReadMutation 
} from '../../store/apiSlice';
import toast from 'react-hot-toast';
import { Trash2, Mail, MailOpen, AlertCircle, Loader2 } from 'lucide-react';

const AdminMessages = () => {
  const { data: messages, isLoading, isError } = useGetMessagesQuery();
  const [deleteMessage] = useDeleteMessageMutation();
  const [markAsRead] = useMarkMessageAsReadMutation();

  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        setDeletingId(id);
        await deleteMessage(id).unwrap();
        toast.success('Message deleted successfully');
      } catch (err) {
        toast.error('Failed to delete message');
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleToggleRead = async (id) => {
    try {
      await markAsRead(id).unwrap();
    } catch (err) {
      toast.error('Failed to update message status');
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col h-[50vh] items-center justify-center text-[#a1a1aa] gap-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <p>Failed to load messages. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Messages</h1>
          <p className="text-sm text-text-muted mt-1">
            Manage incoming communications from your portfolio.
          </p>
        </div>
        <div className="bg-bg-subtle px-4 py-2 rounded-lg border border-border-subtle flex items-center gap-2">
          <Mail className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-white">
            {messages?.filter(m => !m.isRead).length || 0} Unread
          </span>
        </div>
      </div>

      {messages?.length === 0 ? (
        <div className="bg-[#151515] border border-border-subtle rounded-xl p-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-[#1A1A1A] rounded-full flex items-center justify-center mb-4 border border-border-subtle">
            <Mail className="w-8 h-8 text-[#555]" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No Messages</h3>
          <p className="text-[#a1a1aa] max-w-md">
            You haven't received any messages yet. When someone fills out your contact form, it will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {messages?.map((msg) => (
            <div 
              key={msg._id} 
              className={`bg-[#151515] border ${msg.isRead ? 'border-border-subtle' : 'border-accent/30'} rounded-xl p-6 transition-colors`}
            >
              <div className="flex flex-col md:flex-row gap-6">
                
                {/* Meta info */}
                <div className="md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-border-subtle pb-4 md:pb-0 md:pr-6">
                  <div className="flex items-center gap-3 mb-4">
                    <button 
                      onClick={() => handleToggleRead(msg._id)}
                      className={`p-2 rounded-lg transition-colors ${msg.isRead ? 'bg-[#1A1A1A] text-[#a1a1aa] hover:text-white' : 'bg-accent/10 text-accent hover:bg-accent/20'}`}
                      title={msg.isRead ? "Mark as unread" : "Mark as read"}
                    >
                      {msg.isRead ? <MailOpen className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                    </button>
                    <span className="text-xs font-medium text-text-muted">
                      {new Date(msg.createdAt).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1 truncate">{msg.name}</h3>
                  <a href={`mailto:${msg.email}`} className="text-sm text-accent hover:underline truncate block">
                    {msg.email}
                  </a>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                    {!msg.isRead && <span className="w-2 h-2 rounded-full bg-accent shrink-0"></span>}
                    {msg.subject}
                  </h4>
                  <div className="bg-[#1A1A1A] rounded-lg p-4 text-sm text-[#d4d4d8] whitespace-pre-wrap leading-relaxed border border-border-subtle">
                    {msg.message}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex md:flex-col justify-end gap-2 shrink-0">
                  <button
                    onClick={() => handleDelete(msg._id)}
                    disabled={deletingId === msg._id}
                    className="p-2 md:p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center"
                    title="Delete Message"
                  >
                    {deletingId === msg._id ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                  </button>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
