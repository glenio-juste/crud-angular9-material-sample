import { Directive, OnInit, Input, ViewContainerRef, TemplateRef } from '@angular/core';

@Directive({
  selector: '[myFor]'
})
/* export class ForDirective { */ // na criação da diretiva não vem com implements
export class ForDirective implements OnInit {

  // Explicação do imput
  // https://www.cod3r.com.br/courses/take/angular-9-essencial/lessons/11779411-diretivas-na-pratica-02
  // ou https://www.udemy.com/course/curso-web/learn/lecture/18932910#overview

  // ('MyForEm') = no footer componente, <li myFor="let n em [1, 2, 3] usando 'Teste' "></li> , o let n (em) é criado aqui 

  @Input('myForEm') numbers: number[]


  constructor(private container: ViewContainerRef, 
    private template: TemplateRef<any>) { }

  ngOnInit(): void {

    for(let number of this.numbers){
      this.container.createEmbeddedView(
        this.template, { $implicit: number })
    }

    console.log(this.numbers);
    
  }

}
