import React, { ReactNode } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

interface PageContentLayoutProps {
  maxWidth?: string;
  children: ReactNode[]; 
}

export default function PageContentLayout({ children, maxWidth }: PageContentLayoutProps) {
  return (
    <div className="flex justify-center h-0 relative bottom-36 border-0 py-0">
      <Container fluid="md" className={`flex justify-center ${maxWidth ? `max-w-${maxWidth}` : 'max-w-screen-md'}`}>
        <Row className="w-full ">
          <Col xs={12} md={12} className="mb-4 md:mb-0">
            {children[0]}
          </Col>
          <Col xs={12} md={4} className="d-none d-md-flex flex-column">
            {children[1]}
          </Col>
        </Row>
      </Container>
    </div>
  );
}






