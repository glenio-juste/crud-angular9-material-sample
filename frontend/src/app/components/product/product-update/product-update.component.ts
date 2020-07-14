import { Product } from './../product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product

  // injetar o service e o router
  constructor(private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // para trazer os dados na tela
    const id = +this.route.snapshot.paramMap.get('id')
    this.productService.readById(id).subscribe(product => { // esse (product => é o produto que recebemos
      this.product = product; // já vem com id, name e o preço
    })
  }

  // para salvar o produto qdo alterado e clicar no btn salvar
  updateProduct(): void {
    this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage("Produto atualizado com sucesso!");
      // depois de salvar e mostrar a mensagem para o usuário, voltar a tela de lista de produtos
      this.router.navigate(['/products'])
    })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }

  /* deleteProduct() */

}
