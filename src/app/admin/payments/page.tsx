'use client';

import { useState } from 'react';

// Payment interface
interface Payment {
  id: number;
  studentId: number;
  studentName: string;
  amount: number;
  modeOfPayment: 'cash' | 'bank_transfer' | 'mobile_money' | 'check';
  receiptNumber: string;
  paymentDate: Date;
  createdAt: Date;
}

// Student interface for payments
interface PaymentStudent {
  id: number;
  name: string;
  email: string;
  phone: string;
  studentId: string;
  totalFee: number; // Total fee for the course
}

// Payment form data interface
interface PaymentFormData {
  studentId: string;
  amount: string;
  modeOfPayment: 'cash' | 'bank_transfer' | 'mobile_money' | 'check';
  receiptNumber: string;
  paymentDate: string;
}

// Payment summary interface for table
interface PaymentSummary {
  studentId: number;
  studentName: string;
  totalPaid: number;
  balance: number;
  lastPaymentDate: Date | null;
  lastReceiptNumber: string;
  lastPaymentMode: string;
  lastPaymentAmount: number;
}

// Sample students data (this would come from the students API in real implementation)
const sampleStudents: PaymentStudent[] = [
  { id: 1, name: "Alice Johnson", email: "alice.johnson@email.com", phone: "+254712345678", studentId: "ST001A", totalFee: 15000 },
  { id: 2, name: "Bob Smith", email: "bob.smith@email.com", phone: "+254723456789", studentId: "ST002B", totalFee: 15000 },
  { id: 3, name: "Carol Davis", email: "carol.davis@email.com", phone: "+254734567890", studentId: "ST003C", totalFee: 20000 },
  { id: 4, name: "David Wilson", email: "david.wilson@email.com", phone: "+254745678901", studentId: "ST004D", totalFee: 20000 },
  { id: 5, name: "Eva Brown", email: "eva.brown@email.com", phone: "+254756789012", studentId: "ST005E", totalFee: 15000 },
  { id: 6, name: "Frank Miller", email: "frank.miller@email.com", phone: "+254767890123", studentId: "ST006F", totalFee: 25000 },
  { id: 7, name: "Grace Taylor", email: "grace.taylor@email.com", phone: "+254778901234", studentId: "ST007G", totalFee: 15000 },
  { id: 8, name: "Henry Clark", email: "henry.clark@email.com", phone: "+254789012345", studentId: "ST008H", totalFee: 20000 },
  { id: 9, name: "Ivy Anderson", email: "ivy.anderson@email.com", phone: "+254790123456", studentId: "ST009I", totalFee: 15000 },
  { id: 10, name: "Jack Thomas", email: "jack.thomas@email.com", phone: "+254701234567", studentId: "ST010J", totalFee: 25000 }
];

// Payment mode styling helper
const getPaymentModeStyle = (mode: string) => {
  switch (mode) {
    case 'cash':
      return { backgroundColor: '#28a745', color: 'white', icon: 'money-bill-wave' };
    case 'bank_transfer':
      return { backgroundColor: '#007bff', color: 'white', icon: 'university' };
    case 'mobile_money':
      return { backgroundColor: '#17a2b8', color: 'white', icon: 'mobile-alt' };
    case 'check':
      return { backgroundColor: '#6c757d', color: 'white', icon: 'file-invoice' };
    default:
      return { backgroundColor: '#6c757d', color: 'white', icon: 'question-circle' };
  }
};

export default function PaymentsPage() {
  // State management
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: 1,
      studentId: 1,
      studentName: "Alice Johnson",
      amount: 5000,
      modeOfPayment: 'mobile_money',
      receiptNumber: 'RCP001',
      paymentDate: new Date('2024-11-01'),
      createdAt: new Date('2024-11-01')
    },
    {
      id: 2,
      studentId: 2,
      studentName: "Bob Smith",
      amount: 7500,
      modeOfPayment: 'bank_transfer',
      receiptNumber: 'RCP002',
      paymentDate: new Date('2024-11-02'),
      createdAt: new Date('2024-11-02')
    },
    {
      id: 3,
      studentId: 1,
      studentName: "Alice Johnson",
      amount: 10000,
      modeOfPayment: 'cash',
      receiptNumber: 'RCP003',
      paymentDate: new Date('2024-11-05'),
      createdAt: new Date('2024-11-05')
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentDetailsOpen, setIsPaymentDetailsOpen] = useState(false);
  const [selectedStudentPayment, setSelectedStudentPayment] = useState<PaymentSummary | null>(null);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  const [formData, setFormData] = useState<PaymentFormData>({
    studentId: '',
    amount: '',
    modeOfPayment: 'cash',
    receiptNumber: '',
    paymentDate: new Date().toISOString().split('T')[0]
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);
  const [studentSearchTerm, setStudentSearchTerm] = useState('');
  const [errors, setErrors] = useState<Partial<PaymentFormData>>({});

  // Calculate payment summaries for each student
  const getPaymentSummaries = (): PaymentSummary[] => {
    return sampleStudents.map(student => {
      const studentPayments = payments.filter(p => p.studentId === student.id);
      const totalPaid = studentPayments.reduce((sum, p) => sum + p.amount, 0);
      const balance = student.totalFee - totalPaid;
      const lastPayment = studentPayments.sort((a, b) => 
        new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime()
      )[0];

      return {
        studentId: student.id,
        studentName: student.name,
        totalPaid,
        balance,
        lastPaymentDate: lastPayment ? lastPayment.paymentDate : null,
        lastReceiptNumber: lastPayment ? lastPayment.receiptNumber : '',
        lastPaymentMode: lastPayment ? lastPayment.modeOfPayment : '',
        lastPaymentAmount: lastPayment ? lastPayment.amount : 0
      };
    });
  };

  const paymentSummaries = getPaymentSummaries();
  const filteredSummaries = paymentSummaries.filter(summary =>
    summary.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStudents = sampleStudents.filter(student =>
    student.name.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(studentSearchTerm.toLowerCase())
  );

  // Get selected student for balance preview
  const selectedStudent = sampleStudents.find(s => s.id === parseInt(formData.studentId));
  const selectedStudentTotalPaid = selectedStudent 
    ? payments.filter(p => p.studentId === selectedStudent.id).reduce((sum, p) => sum + p.amount, 0)
    : 0;
  const selectedStudentBalance = selectedStudent 
    ? selectedStudent.totalFee - selectedStudentTotalPaid
    : 0;

  // Validation
  const validateForm = (): boolean => {
    const newErrors: Partial<PaymentFormData> = {};

    if (!formData.studentId) newErrors.studentId = 'Student is required';
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    } else if (selectedStudent && parseFloat(formData.amount) > selectedStudentBalance) {
      newErrors.amount = 'Amount cannot exceed remaining balance';
    }
    if (!formData.receiptNumber.trim()) newErrors.receiptNumber = 'Receipt number is required';
    if (!formData.paymentDate) newErrors.paymentDate = 'Payment date is required';

    // Check for duplicate receipt number
    const duplicateReceipt = payments.some(p => 
      p.receiptNumber.toLowerCase() === formData.receiptNumber.toLowerCase() &&
      (!editingPayment || p.id !== editingPayment.id)
    );
    if (duplicateReceipt) {
      newErrors.receiptNumber = 'Receipt number already exists';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form handlers
  const handleSubmit = () => {
    if (!validateForm()) return;

    const student = sampleStudents.find(s => s.id === parseInt(formData.studentId));
    if (!student) return;

    const paymentData: Payment = {
      id: editingPayment ? editingPayment.id : Date.now(),
      studentId: student.id,
      studentName: student.name,
      amount: parseFloat(formData.amount),
      modeOfPayment: formData.modeOfPayment,
      receiptNumber: formData.receiptNumber,
      paymentDate: new Date(formData.paymentDate),
      createdAt: editingPayment ? editingPayment.createdAt : new Date()
    };

    if (editingPayment) {
      setPayments(payments.map(p => p.id === editingPayment.id ? paymentData : p));
    } else {
      setPayments([...payments, paymentData]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      studentId: '',
      amount: '',
      modeOfPayment: 'cash',
      receiptNumber: '',
      paymentDate: new Date().toISOString().split('T')[0]
    });
    setErrors({});
    setEditingPayment(null);
    setIsModalOpen(false);
    setShowStudentDropdown(false);
    setStudentSearchTerm('');
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleStudentSelect = (student: PaymentStudent) => {
    setFormData({ ...formData, studentId: student.id.toString() });
    setShowStudentDropdown(false);
    setStudentSearchTerm(student.name);
  };

  const handlePaymentDetails = (summary: PaymentSummary) => {
    setSelectedStudentPayment(summary);
    setIsPaymentDetailsOpen(true);
  };

  // Calculate totals
  const totalFeesCollected = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalOutstandingBalance = paymentSummaries.reduce((sum, s) => sum + s.balance, 0);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '30px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div>
          <h1 style={{ margin: 0, color: '#333', fontSize: '28px', fontWeight: 'bold' }}>
            <i className="fas fa-money-check-alt" style={{ marginRight: '15px', color: '#007bff' }}></i>
            Payment Management
          </h1>
          <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '16px' }}>
            Manage student payments, track balances, and generate receipts
          </p>
        </div>
        <button
          onClick={openAddModal}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <i className="fas fa-plus"></i>
          Record Payment
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px', 
        marginBottom: '30px' 
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', color: '#28a745', marginBottom: '10px' }}>
            <i className="fas fa-coins"></i>
          </div>
          <h3 style={{ margin: '0 0 5px 0', fontSize: '24px', fontWeight: '600' }}>
            KES {totalFeesCollected.toLocaleString()}
          </h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Total Fees Collected</p>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', color: '#dc3545', marginBottom: '10px' }}>
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <h3 style={{ margin: '0 0 5px 0', fontSize: '24px', fontWeight: '600' }}>
            KES {totalOutstandingBalance.toLocaleString()}
          </h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Outstanding Balance</p>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', color: '#007bff', marginBottom: '10px' }}>
            <i className="fas fa-users"></i>
          </div>
          <h3 style={{ margin: '0 0 5px 0', fontSize: '24px', fontWeight: '600' }}>
            {paymentSummaries.filter(s => s.balance === 0).length}
          </h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Fully Paid Students</p>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', color: '#ffc107', marginBottom: '10px' }}>
            <i className="fas fa-clock"></i>
          </div>
          <h3 style={{ margin: '0 0 5px 0', fontSize: '24px', fontWeight: '600' }}>
            {paymentSummaries.filter(s => s.balance > 0).length}
          </h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Pending Payments</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div style={{ 
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <input
              type="text"
              placeholder="Search students by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e1e5e9',
                borderRadius: '6px',
                fontSize: '16px'
              }}
            />
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #e1e5e9' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
            Student Payment Records
          </h3>
        </div>

        {filteredSummaries.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: '#f8f9fa' }}>
                <tr>
                  <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', fontSize: '14px', color: '#333' }}>
                    Student Name
                  </th>
                  <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', fontSize: '14px', color: '#333' }}>
                    Total Fee
                  </th>
                  <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', fontSize: '14px', color: '#333' }}>
                    Paid
                  </th>
                  <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', fontSize: '14px', color: '#333' }}>
                    Balance
                  </th>
                  <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', fontSize: '14px', color: '#333' }}>
                    Payment Status
                  </th>
                  <th style={{ padding: '15px', textAlign: 'center', fontWeight: '600', fontSize: '14px', color: '#333' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSummaries.map((summary) => {
                  const student = sampleStudents.find(s => s.id === summary.studentId);
                  const paymentStatus = summary.balance === 0 ? 'Fully Paid' : summary.totalPaid > 0 ? 'Partial Payment' : 'Not Paid';
                  const statusColor = summary.balance === 0 ? '#28a745' : summary.totalPaid > 0 ? '#ffc107' : '#dc3545';

                  return (
                    <tr key={summary.studentId} style={{ borderBottom: '1px solid #e1e5e9' }}>
                      <td style={{ padding: '15px' }}>
                        <div>
                          <div style={{ fontWeight: '600', fontSize: '16px', marginBottom: '3px' }}>
                            {summary.studentName}
                          </div>
                          <div style={{ fontSize: '12px', color: '#6c757d' }}>
                            ID: {student?.studentId}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '15px', fontWeight: '600', fontSize: '16px' }}>
                        KES {student?.totalFee.toLocaleString()}
                      </td>
                      <td style={{ padding: '15px', fontWeight: '600', fontSize: '16px', color: '#28a745' }}>
                        KES {summary.totalPaid.toLocaleString()}
                      </td>
                      <td style={{ padding: '15px', fontWeight: '600', fontSize: '16px', color: summary.balance > 0 ? '#dc3545' : '#28a745' }}>
                        KES {summary.balance.toLocaleString()}
                      </td>
                      <td style={{ padding: '15px' }}>
                        <div style={{
                          padding: '6px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '600',
                          backgroundColor: statusColor,
                          color: 'white',
                          textAlign: 'center',
                          display: 'inline-block'
                        }}>
                          {paymentStatus}
                        </div>
                      </td>
                      <td style={{ padding: '15px', textAlign: 'center' }}>
                        <button
                          onClick={() => handlePaymentDetails(summary)}
                          style={{
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            margin: '0 auto'
                          }}
                        >
                          <i className="fas fa-eye"></i>
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{
            padding: '60px 20px',
            textAlign: 'center',
            color: '#6c757d'
          }}>
            <i className="fas fa-search" style={{ fontSize: '48px', marginBottom: '20px', opacity: 0.5 }}></i>
            <h3 style={{ margin: '0 0 10px 0' }}>No students found</h3>
            <p style={{ margin: 0 }}>Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Payment Form Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            <div style={{
              padding: '20px',
              borderBottom: '1px solid #e1e5e9',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>
                {editingPayment ? 'Edit Payment' : 'Record New Payment'}
              </h2>
              <button
                onClick={resetForm}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#6c757d'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ padding: '20px' }}>
              {/* Student Selection */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  Student *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Search and select student..."
                    value={studentSearchTerm}
                    onChange={(e) => {
                      setStudentSearchTerm(e.target.value);
                      setShowStudentDropdown(true);
                    }}
                    onFocus={() => setShowStudentDropdown(true)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: `2px solid ${errors.studentId ? '#dc3545' : '#e1e5e9'}`,
                      borderRadius: '6px',
                      fontSize: '16px'
                    }}
                  />
                  {showStudentDropdown && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      backgroundColor: 'white',
                      border: '1px solid #e1e5e9',
                      borderRadius: '6px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                      maxHeight: '200px',
                      overflowY: 'auto',
                      zIndex: 1001
                    }}>
                      {filteredStudents.map(student => (
                        <div
                          key={student.id}
                          onClick={() => handleStudentSelect(student)}
                          style={{
                            padding: '12px',
                            cursor: 'pointer',
                            borderBottom: '1px solid #f1f1f1'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                        >
                          <div style={{ fontWeight: '600', fontSize: '14px' }}>{student.name}</div>
                          <div style={{ fontSize: '12px', color: '#6c757d' }}>
                            ID: {student.studentId} • Total Fee: KES {student.totalFee.toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {errors.studentId && (
                  <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                    {errors.studentId}
                  </div>
                )}
              </div>

              {/* Fee Summary for Selected Student */}
              {selectedStudent && (
                <div style={{
                  backgroundColor: '#f8f9fa',
                  padding: '15px',
                  borderRadius: '6px',
                  marginBottom: '20px',
                  border: '1px solid #e1e5e9'
                }}>
                  <h4 style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: '600' }}>
                    Fee Summary for {selectedStudent.name}
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', fontSize: '14px' }}>
                    <div>
                      <strong>Total Fee:</strong><br/>
                      KES {selectedStudent.totalFee.toLocaleString()}
                    </div>
                    <div style={{ color: '#28a745' }}>
                      <strong>Total Paid:</strong><br/>
                      KES {selectedStudentTotalPaid.toLocaleString()}
                    </div>
                    <div style={{ color: selectedStudentBalance > 0 ? '#dc3545' : '#28a745' }}>
                      <strong>Balance:</strong><br/>
                      KES {selectedStudentBalance.toLocaleString()}
                    </div>
                  </div>
                </div>
              )}

              {/* Amount */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  Payment Amount (KES) *
                </label>
                <input
                  type="number"
                  placeholder="Enter payment amount"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `2px solid ${errors.amount ? '#dc3545' : '#e1e5e9'}`,
                    borderRadius: '6px',
                    fontSize: '16px'
                  }}
                />
                {errors.amount && (
                  <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                    {errors.amount}
                  </div>
                )}
              </div>

              {/* Mode of Payment */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  Mode of Payment *
                </label>
                <select
                  value={formData.modeOfPayment}
                  onChange={(e) => setFormData({ ...formData, modeOfPayment: e.target.value as any })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e1e5e9',
                    borderRadius: '6px',
                    fontSize: '16px',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="cash">Cash</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="mobile_money">Mobile Money (M-Pesa/Airtel Money)</option>
                  <option value="check">Check</option>
                </select>
              </div>

              {/* Receipt Number */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  Receipt Number *
                </label>
                <input
                  type="text"
                  placeholder="Enter receipt number"
                  value={formData.receiptNumber}
                  onChange={(e) => setFormData({ ...formData, receiptNumber: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `2px solid ${errors.receiptNumber ? '#dc3545' : '#e1e5e9'}`,
                    borderRadius: '6px',
                    fontSize: '16px'
                  }}
                />
                {errors.receiptNumber && (
                  <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                    {errors.receiptNumber}
                  </div>
                )}
              </div>

              {/* Payment Date */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  Date of Payment *
                </label>
                <input
                  type="date"
                  value={formData.paymentDate}
                  onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `2px solid ${errors.paymentDate ? '#dc3545' : '#e1e5e9'}`,
                    borderRadius: '6px',
                    fontSize: '16px'
                  }}
                />
                {errors.paymentDate && (
                  <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                    {errors.paymentDate}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end', padding: '20px' }}>
              <button
                onClick={resetForm}
                style={{
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                {editingPayment ? 'Update Payment' : 'Record Payment'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Details Modal */}
      {isPaymentDetailsOpen && selectedStudentPayment && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            width: '90%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            <div style={{
              padding: '20px',
              borderBottom: '1px solid #e1e5e9',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>
                Payment Details
              </h2>
              <button
                onClick={() => setIsPaymentDetailsOpen(false)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#6c757d'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ padding: '20px' }}>
              <div style={{
                backgroundColor: '#f8f9fa',
                padding: '20px',
                borderRadius: '8px',
                marginBottom: '20px'
              }}>
                <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', fontWeight: '600' }}>
                  {selectedStudentPayment.studentName}
                </h3>
                
                <div style={{ display: 'grid', gap: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '600' }}>Total Amount Paid:</span>
                    <span style={{ fontSize: '18px', fontWeight: '600', color: '#28a745' }}>
                      KES {selectedStudentPayment.totalPaid.toLocaleString()}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '600' }}>Remaining Balance:</span>
                    <span style={{ 
                      fontSize: '18px', 
                      fontWeight: '600', 
                      color: selectedStudentPayment.balance > 0 ? '#dc3545' : '#28a745' 
                    }}>
                      KES {selectedStudentPayment.balance.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {selectedStudentPayment.lastPaymentDate && (
                <div style={{
                  backgroundColor: 'white',
                  border: '1px solid #e1e5e9',
                  borderRadius: '8px',
                  padding: '20px'
                }}>
                  <h4 style={{ margin: '0 0 15px 0', fontSize: '16px', fontWeight: '600' }}>
                    Last Payment Information
                  </h4>
                  
                  <div style={{ display: 'grid', gap: '12px', fontSize: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: '600' }}>Receipt Number:</span>
                      <span>{selectedStudentPayment.lastReceiptNumber}</span>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: '600' }}>Payment Amount:</span>
                      <span style={{ color: '#28a745', fontWeight: '600' }}>
                        KES {selectedStudentPayment.lastPaymentAmount.toLocaleString()}
                      </span>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: '600' }}>Mode of Payment:</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {(() => {
                          const modeStyle = getPaymentModeStyle(selectedStudentPayment.lastPaymentMode);
                          return (
                            <>
                              <i className={`fas fa-${modeStyle.icon}`} style={{ color: modeStyle.backgroundColor }}></i>
                              <span style={{ textTransform: 'capitalize' }}>
                                {selectedStudentPayment.lastPaymentMode.replace('_', ' ')}
                              </span>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: '600' }}>Date of Payment:</span>
                      <span>{new Date(selectedStudentPayment.lastPaymentDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              )}

              {!selectedStudentPayment.lastPaymentDate && (
                <div style={{
                  backgroundColor: '#fff3cd',
                  border: '1px solid #ffeaa7',
                  borderRadius: '8px',
                  padding: '20px',
                  textAlign: 'center'
                }}>
                  <i className="fas fa-exclamation-triangle" style={{ fontSize: '24px', color: '#856404', marginBottom: '10px' }}></i>
                  <h4 style={{ margin: '0 0 5px 0', color: '#856404' }}>No Payment Records</h4>
                  <p style={{ margin: 0, color: '#856404' }}>This student has not made any payments yet.</p>
                </div>
              )}
            </div>

            <div style={{ padding: '20px', textAlign: 'center' }}>
              <button
                onClick={() => setIsPaymentDetailsOpen(false)}
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {showStudentDropdown && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setShowStudentDropdown(false)}
        />
      )}
    </div>
  );
}