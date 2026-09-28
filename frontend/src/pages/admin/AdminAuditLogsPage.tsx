import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Clock, CheckCircle2, ArrowLeft, RefreshCw, Database } from 'lucide-react';
import { api } from '../../services/api';

export const AdminAuditLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const data = await api.getAuditLogs(50);
      setLogs(data);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link to="/admin" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-purple-600 font-medium mb-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Admin Center</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Cpu className="w-6 h-6 text-purple-600" />
            <span>Multi-Agent AI Decision Audit Trail</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Immutable log of every user query, agents coordinated, rules evaluated, and execution latencies.
          </p>
        </div>

        <button
          onClick={fetchLogs}
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 text-xs flex items-center gap-1.5 self-start sm:self-center"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Audit Logs</span>
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-slate-500 font-medium">Fetching multi-agent run records...</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 text-slate-500 uppercase tracking-wider text-[11px]">
                <th className="p-4">Run ID & Timestamp</th>
                <th className="p-4">Citizen Intent</th>
                <th className="p-4">Agents Orchestrated</th>
                <th className="p-4">Rules Evaluated</th>
                <th className="p-4">Latency</th>
                <th className="p-4">Audit Summary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-4 font-mono">
                    <span className="font-bold text-slate-900 dark:text-white">#{log.id}</span>
                    <span className="text-slate-400 block text-[10px]">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                    {log.intent}
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {log.agents_called?.map((ag: string, idx: number) => (
                        <span key={idx} className="px-1.5 py-0.2 rounded bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-mono text-[10px]">
                          {ag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 font-semibold">
                    {log.rules_evaluated_count}
                  </td>
                  <td className="p-4 font-mono font-semibold text-emerald-600">
                    {log.execution_time_ms} ms
                  </td>
                  <td className="p-4 text-slate-500 max-w-sm truncate">
                    {log.audit_summary}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
