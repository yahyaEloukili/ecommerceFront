import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CatalogueService } from "../services/catalogue.service";
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products;
  url = this.catalogueService.host + '/photoProduct/';
  routeChangeDetection: any;
  editPhoto: boolean;
  currentProduct: any;
  selectedFiles: any;
  progress: number;
  currentFileUploaded: any;
  timestamp: number;
  title

  constructor(public catalogueService: CatalogueService, private router: Router, private route: ActivatedRoute) {
    this.routeChangeDetection = this.router.events.subscribe((event) => {
      localStorage.setItem("categorie", this.route.snapshot.params.p2)
    })
  }

  ngOnInit(): void {


    this.func();

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        let url = val.url;
        this.func();
      }
    })

  }
  private getProducts(url) {
    this.catalogueService.getResource(url).subscribe(data => {
      this.products = data;
    })
  }
  func() {
    let p1 = this.route.snapshot.params.p1;
    let p2 = this.route.snapshot.params.p2;
    if (p1 === '1') {

      this.getProducts("/products/search/selectedProducts");
      this.title = "produits selectionnés"
    }
    else if (p1 === '2') {
      let idCat = this.route.snapshot.params.p2;
      this.title = "produits de la categorie " + idCat

      this.getProducts('/categories/' + idCat + '/products')
    }
    else if (p1 === '3') {
      this.getProducts("/products/search/promoProducts");
      this.title = "produits en promotion"
    }
    else if (p1 === '4') {
      this.getProducts("/products/search/dispoProducts");
      this.title = "produits disponible"
    }

  }
  onEditPhoto(p) {
    this.editPhoto = true;
    this.currentProduct = p;
  }
  onSelectedFile(event) {
    this.selectedFiles = event.target.files;

  }
  uploadPhoto() {
    this.progress = 0;
    this.timestamp = 1234;
    this.currentFileUploaded = this.selectedFiles?.item(0);
    this.catalogueService.uploadPhoto(this.currentFileUploaded, this.currentProduct.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);


      } else if (event instanceof HttpResponse) {
        this.timestamp = Date.now();

      }

    }, err => {
      alert("probleme de chargement");
    })
  }
}
