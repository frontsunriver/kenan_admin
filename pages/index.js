// import node module libraries
import { Col, Row, Container } from 'react-bootstrap';

const Home = () => {
    return (
        <Container fluid className="p-6">
			<Row>
				<Col lg={12} md={12} sm={12}>
					<div className="border-bottom pb-4 mb-4 d-md-flex justify-content-center align-items-center">
						<div className="mb-3 mb-md-0">
							<h1 className="mb-0 h2 fw-bold">Welcome to visit our platform</h1>
						</div>
					</div>
				</Col>
			</Row>		
		</Container>
    )
}
export default Home;
