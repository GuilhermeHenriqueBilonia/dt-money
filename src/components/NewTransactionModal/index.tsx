import React, { FormEvent, useContext, useState } from 'react';
import Modal from 'react-modal'
import { Container, TransactionTypeContainer, RadioBox } from './styles';

import closeImg from '../../assets/Vector.svg'
import incomeImg from '../../assets/Entradas.svg'
import outcomeImg from '../../assets/Saídas.svg'
import { useTransaction } from '../../hooks/useTransactions';


Modal.setAppElement('#root')

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [amount, setAmount] = useState(0)

    const {createTransaction} = useTransaction()
    
    const [type, setType] = useState('deposit');

    async function handleCreateNewTransaction (event: FormEvent) {
        event.preventDefault();

        try {
            await createTransaction({
                title,
                amount,
                category,
                type
            })

            console.log('passou')

            setTitle('');
            setAmount(0);
            setType('deposit');
            setCategory('');
            onRequestClose()
        }
        catch {
            console.log('erro')
        }
    }

    return (
        <Modal 
          isOpen={isOpen} 
          onRequestClose={onRequestClose}
          overlayClassName="react-modal-overlay"
          className="react-modal-content"
        >
            <img src={closeImg} 
            alt="Fechar" 
            onClick={onRequestClose} 
            className="react-modal-close" 
            />
            <Container>
                <h2>Cadastrar Transação</h2>

                <form action="POST" onSubmit={handleCreateNewTransaction}>
                    <input 
                      type="text" 
                      placeholder="Título" 
                      value={title}
                      onChange={event => setTitle(event.target.value)}
                    />

                    <input 
                      type="number" 
                      placeholder="Valor"
                      value={amount}
                      onChange={event => setAmount(Number(event.target.value))}
                    />
                    <TransactionTypeContainer>
                        <RadioBox 
                        type="button"
                        onClick={() => {setType('deposit')}}
                        isActive={type === 'deposit'}
                        activeColor="green"
                        >
                            <img src={incomeImg} alt="Entrada" />
                            <span>Entrada</span>
                        </RadioBox>

                        <RadioBox 
                        type="button" 
                        onClick={() => {setType('withdraw')}}
                        isActive={type === 'withdraw'}
                        activeColor="red"
                        >
                            <img src={outcomeImg} alt="Saída" />
                            <span>Saída</span>
                        </RadioBox>

                    </TransactionTypeContainer>

                    <input 
                      type="text" 
                      placeholder="Categoria" 
                      value={category}
                      onChange={event => setCategory(event.target.value)}
                    />

                    <button type="submit">
                        Cadastrar
                    </button>
                </form>
            </Container>
        </Modal>
    )
}