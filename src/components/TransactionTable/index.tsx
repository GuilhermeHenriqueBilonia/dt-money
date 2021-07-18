import { useTransaction } from "../../hooks/useTransactions"
import { Container } from "./styles"

export function TransactionTable() {
    const {transactions} = useTransaction()

    return(
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Preço</th>
                        <th>Categoria</th>
                        <th>Data</th>

                    </tr>
                </thead>

                <tbody>
                    {transactions.map(item => (
                        <tr key={item.id}>
                            <td>{item.title}</td>
                            <td className={item.type}>
                                {new Intl.NumberFormat('pt-BR',{
                                    style: 'currency',
                                    currency: 'BRL',
                                }).format(item.amount)}
                            </td>
                            <td>{item.category}</td>
                            <td>{item.createdAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    )
}