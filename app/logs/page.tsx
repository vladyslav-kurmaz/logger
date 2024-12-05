'use client'

import { ClientLog, ErrorLog } from '@/types'
import { useEffect, useState } from 'react'

export default function LogsPage() {
  const [clientLogs, setClientLogs] = useState<ClientLog[]>([])
  const [errorLogs, setErrorLogs] = useState<ErrorLog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch('/api/logs')
        const data = await res.json()
        setClientLogs(data.clientLogs || [])
        setErrorLogs(data.errorLogs || [])
      } catch (error) {
        console.error('Error fetching logs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLogs()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='flex flex-col justify-between h-screen overflow-hidden'>
      <h1 className='text-3xl font-bold p-5'>Logs</h1>

      <div className='flex overflow-y-scroll'>
        <section className='w-full px-5 pt-7 pb-3 h-full bg-green-400 text-stone-950'>
          <h2>Client Logs</h2>
            <table className='w-full'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Action Type</th>
                  <th>Data</th>
                  <th>Path</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
            </table>
            {/* Container for the scrollable tbody */}
            <div className="max-h-screen overflow-y-auto">
              <table className='w-full'>
                <tbody>
                  {clientLogs.map((log) => (
                    <tr key={log.id}>
                      <td>{log.id}</td>
                      <td>{log.actionType}</td>
                      <td>{JSON.stringify(log.data)}</td>
                      <td>{log.path}</td>
                      <td>{new Date(log.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </section>

        <section className='w-full px-5 pt-7 pb-3 h-full bg-red-400 text-stone-950'>
          <h2>Error Logs</h2>
          <table className='w-full'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Error Message</th>
                <th>Stack Trace</th>
                <th>Path</th>
                <th>Timestamp</th>
              </tr>
            </thead>
          </table>
          {/* Container for the scrollable tbody */}
          <div className="max-h-screen overflow-y-auto">
            <table className='w-full'>
              <tbody>
                {errorLogs.map((log) => (
                  <tr key={log.id}>
                    <td>{log.id}</td>
                    <td>{log.errorMessage}</td>
                    <td>{log.stackTrace ? log.stackTrace : 'N/A'}</td>
                    <td>{log.path}</td>
                    <td>{new Date(log.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}
